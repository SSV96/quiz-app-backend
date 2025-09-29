import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuizDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}
