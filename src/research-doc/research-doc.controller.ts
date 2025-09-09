import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import { extname } from 'path';
import { ResearchDocService } from './research-doc.service';
import { Role } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/client/client.enum';

@Controller('research-docs')
export class ResearchDocController {
  constructor(private readonly service: ResearchDocService) {}

  @Get()
  @Role(RoleEnum.ADMIN, RoleEnum.CLIENT)
  async search(
    @Query('tag') tag?: string,
    @Query('text') text?: string,
    @Query('projectId') projectId?: string,
  ) {
    return this.service.search({ tag, text, projectId });
  }

  @Post('upload')
  @Role(RoleEnum.ADMIN, RoleEnum.CLIENT)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'attachments',
        filename: (_req: Request, file: Multer.File, cb: any) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = extname(file.originalname || '');
          cb(null, `${unique}${ext}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Multer.File,
    @Body()
    {
      title,
      tags,
      projectId,
    }: { title?: string; tags?: string[]; projectId: string },
  ) {
    const avatarFd = file?.filename ?? '';
    return this.service.create({
      title: title ?? file?.originalname,
      content: '',
      tags: tags ?? [],
      projectId: projectId,
      avatarFd,
    });
  }
}
