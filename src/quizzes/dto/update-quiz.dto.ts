import { IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { UpdateQuizBlockDto } from './update-quiz-block.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuizDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  blocks?: UpdateQuizBlockDto[];
}
