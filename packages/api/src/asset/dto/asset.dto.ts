import { ApiProperty } from '@nestjs/swagger';

export class PrivatePreviewAssetDTO {
  @ApiProperty({ description: '파일 UUID' })
  uuid: string;

  @ApiProperty({ description: '파일명' })
  filename: string;

  @ApiProperty({ description: '파일 url' })
  url: string;

  @ApiProperty({ description: '파일 업로드일' })
  createdAt: Date;
}
