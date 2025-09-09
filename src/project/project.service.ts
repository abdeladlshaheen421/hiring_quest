import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { Vendor } from 'src/vendor/vendor.entity';
import { Match } from 'src/match/match.entity';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    private readonly notificationService: NotificationService,
  ) {}

  private computeScore(overlapCount: number, rating: number, slaHours: number) {
    const slaWeight = slaHours <= 24 ? 3 : slaHours <= 72 ? 1 : 0;
    return overlapCount * 2 + Number(rating) + slaWeight;
  }

  async rebuildMatches(
    projectId: string,
    user?: { role: string; client?: { id: string; contactEmail: string } },
  ) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['client'],
    });
    if (!project) throw new NotFoundException('Project not found');
    if (
      user &&
      user.role === 'client' &&
      user?.client?.id !== project.client.id
    ) {
      throw new NotFoundException('Project not found');
    }

    const vendors = await this.vendorRepository.find();
    const eligible = vendors.filter((v) =>
      v.countriesSupported.includes(project.country),
    );

    const needed = new Set(project.servicesNeeded);
    const results: Array<{ vendor: Vendor; score: number }> = [];
    for (const vendor of eligible) {
      const overlap = vendor.servicesOffered.filter((s) => needed.has(s));
      if (overlap.length === 0) continue;
      const score = this.computeScore(
        overlap.length,
        Number(vendor.rating),
        vendor.responseSlaHours,
      );
      results.push({ vendor, score });
    }

    const existing = await this.matchRepository.find({
      where: { project: { id: project.id } },
      relations: ['vendor', 'project'],
    });
    const existingByVendorId = new Map(existing.map((m) => [m.vendor.id, m]));

    const upserts: Match[] = [];
    for (const r of results) {
      const found = existingByVendorId.get(r.vendor.id);
      if (found) {
        found.score = r.score;
        upserts.push(found);
      } else {
        const m = this.matchRepository.create({
          project: { id: project.id } as Project,
          vendor: { id: r.vendor.id } as Vendor,
          score: r.score,
        });
        upserts.push(m);
        // Notify
        await this.notificationService.sendEmail(
          user.client?.contactEmail,
          'New match generated',
          `Project ${project.id} matched with vendor ${r.vendor.name} (score ${r.score})`,
        );
      }
    }

    if (upserts.length > 0) {
      await this.matchRepository.save(upserts);
    }

    return { total: results.length };
  }

  async rebuildMatchesForActiveProjects() {
    const activeProjects = await this.projectRepository.find({
      where: { status: 'active' as any },
    });
    for (const p of activeProjects) {
      await this.rebuildMatches(p.id);
    }
  }
}
