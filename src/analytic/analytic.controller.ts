import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytic.service';
import { Role } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/client/client.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly service: AnalyticsService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('top-vendors')
  @Role(RoleEnum.ADMIN)
  async topVendors() {
    return this.service.topVendors();
  }
}
