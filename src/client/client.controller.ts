import { Controller } from '@nestjs/common';
import { Role } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from './client.enum';

@Controller('clients')
@Role(RoleEnum.ADMIN)
export class ClientController {}
