import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';
import { LessThan } from 'typeorm';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  async flagExpiredSlaVendors() {
    const vendors = await this.vendorRepository.find({
      where: { responseSlaHours: LessThan(0) },
    });
    return vendors.length;
  }
}
