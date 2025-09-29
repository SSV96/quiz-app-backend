import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { QuizzesModule } from './quizzes/quizzes.module';

@Module({
  imports: [CommonModule, QuizzesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
