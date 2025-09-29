import { type QuizBlockResponse } from './quiz-block';

export class QuizResponse {
  id: string;
  title: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  blocks?: QuizBlockResponse[];
}
