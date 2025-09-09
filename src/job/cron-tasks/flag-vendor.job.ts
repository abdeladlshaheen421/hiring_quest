import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { VendorService } from 'src/vendor/vendor.service';

@Injectable()
export class FlagVendorsJob {
  private readonly logger = new Logger(FlagVendorsJob.name);

  constructor(private readonly vendorService: VendorService) {}

  // Runs every hour
  @Cron(CronExpression.EVERY_HOUR)
  async handleFlagExpiredSla() {
    try {
      await this.vendorService.flagExpiredSlaVendors();
    } catch (error) {
      this.logger.error('❌ Error while flagging vendors', error.stack);
    }
  }
}
