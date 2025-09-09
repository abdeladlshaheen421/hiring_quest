import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytic.service';
import { Role } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/client/client.enum';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly service: AnalyticsService) {}

  @Get('top-vendors')
  @Role(RoleEnum.ADMIN)
  async topVendors() {
    return this.service.topVendors();
  }
}
