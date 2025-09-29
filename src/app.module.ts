import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [CommonModule, QuizModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
