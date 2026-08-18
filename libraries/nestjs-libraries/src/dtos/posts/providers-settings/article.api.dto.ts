import {
  IsArray,
  IsDefined,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { MediaDto } from '@gitroom/nestjs-libraries/dtos/media/media.dto';
import { Type } from 'class-transformer';

export class ArticleApiDto {
  @IsString()
  @MinLength(2)
  @IsDefined()
  title: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => MediaDto)
  main_image?: MediaDto;

  // Ids come from the destination tool, so they stay strings - unlike
  // WordPress, a generic API can key its authors / categories any way it wants.
  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  // Free text: every API has its own publishing vocabulary (publish, published,
  // live, 1...), so there is no fixed list to validate against.
  @IsOptional()
  @IsString()
  status?: string;
}
