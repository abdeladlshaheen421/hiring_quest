import { Controller, UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { RoleEnum } from 'src/client/client.enum';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('vendors')
@Role(RoleEnum.ADMIN)
export class VendorsController {}
