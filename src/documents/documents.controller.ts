import { Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { DocumentsService } from './documents.service';
import cloudinary from './cloudinary.provider';

@Controller('documents')
@UseGuards(AuthGuard('jwt'))
export class DocumentsController {
  constructor(private docs: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    let uploaded: any = null;
    if (file && file.buffer) {
      uploaded = await cloudinary.uploader.upload_stream({ resource_type: 'auto' }, () => {});
    }

    const created = await this.docs.create({
      projectId: +body.projectId,
      title: body.title,
      content: body.content,
      tags: body.tags ? body.tags.split(',').map((t: string) => t.trim()) : [],
      fileUrl: body.fileUrl || null
    });
    return created;
  }

  @Get('search')
  async search(@Query('tag') tag?: string, @Query('q') q?: string, @Query('projectId') projectId?: string) {
    return this.docs.search({ tag, q, projectId: projectId ? +projectId : undefined });
  }
}
