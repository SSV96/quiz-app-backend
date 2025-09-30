import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UpdateQuizBlockDto } from './dto/update-quiz-block.dto';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: {
        title: createQuizDto.title,
      },
      select: {
        id: true,
        title: true,
        blocks: true,
        published: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAll() {
    return this.prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        published: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        blocks: { orderBy: { updatedAt: 'asc' } },
      },
    });
    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }
    return quiz;
  }

  async update(id: string, updateQuizDto: UpdateQuizDto) {
    const { blocks, title } = updateQuizDto;
    console.log(blocks);

    try {
      if (!blocks) {
        return this.prisma.quiz.update({
          where: { id },
          data: { title },
          include: { blocks: true },
        });
      }

      const { toCreate, toUpdate, toDelete } = blocks.reduce(
        (acc, block) => {
          if (block.isDeleted && block.id) {
            acc.toDelete.push(block.id);
          } else if (block.id && block.isUpdated && !block.isNew) {
            acc.toUpdate.push(block);
          } else if (block.isNew) {
            const { id, ...rest } = block;
            acc.toCreate.push(rest);
          }
          return acc;
        },
        {
          toCreate: [] as Partial<UpdateQuizBlockDto>[],
          toUpdate: [] as Partial<UpdateQuizBlockDto>[],
          toDelete: [] as string[],
        },
      );

      const queries = [
        // ...toDelete.map((id) => this.prisma.quizBlock.delete({ where: { id } })),
        this.prisma.quizBlock.deleteMany({ where: { id: { in: toDelete } } }),
        ...toUpdate.map((block) =>
          this.prisma.quizBlock.update({
            where: { id: block.id },
            data: {
              type: block.type,
              properties: block.properties as any,
            },
          }),
        ),

        ...toCreate.map((block) =>
          this.prisma.quizBlock.create({
            data: {
              quizId: id,
              type: block.type!,
              properties: block.properties as any,
            },
          }),
        ),

        this.prisma.quiz.update({
          where: { id },
          data: { title },
        }),
      ];

      await this.prisma.$transaction(queries);

      return this.prisma.quiz.findUnique({
        where: { id },
        include: { blocks: true },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async publish(id: string) {
    return this.prisma.quiz.update({
      where: { id },
      data: { published: true, publishedAt: new Date() },
    });
  }

  async deleteQuiz(id: string) {
    return this.prisma.quiz.delete({
      where: { id },
    });
  }
}
