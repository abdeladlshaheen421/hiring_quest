import { Controller } from '@nestjs/common';
import { Role } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/client/client.enum';

@Controller('matches')
@Role(RoleEnum.ADMIN)
export class MatchesController {}
