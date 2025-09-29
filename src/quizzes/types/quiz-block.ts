import { BlockType } from '@prisma/client';
import { TQuizBlock } from '.';

export class QuizBlockResponse {
  id: string;
  quizId: string;
  order: number;
  blockType: BlockType;
  properties:TQuizBlock;
  createdAt: Date;
  updatedAt: Date;
}