import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorsController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { Vendor } from './vendor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor])],
  controllers: [VendorsController],
  providers: [VendorService],
  exports: [VendorService],
})
export class VendorsModule {}
