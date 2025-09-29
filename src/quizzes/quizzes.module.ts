import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
