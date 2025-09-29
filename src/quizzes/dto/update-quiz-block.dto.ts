import { IsEnum, IsInt, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { BlockType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { TQuizBlock } from '../types';

export class UpdateQuizBlockDto {

 @ApiProperty()
  @IsOptional()
  id:string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  order: number;
  
  @ApiProperty()
  @IsEnum(BlockType)
  type: BlockType;
  
  @ApiProperty()
  @IsObject()
  properties?: TQuizBlock['properties'];
    @ApiProperty()
   isDeleted?: boolean;
  @ApiProperty()
   isNew?: boolean;
     @ApiProperty()
   isUpdated?: boolean;
  
}
