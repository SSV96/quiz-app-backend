import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { BlockEnum, QuestionKindEnum } from 'src/quizzes/types';

const prisma = new PrismaClient();

async function main() {
  console.log(' Starting seed...');

  // Clear existing data
  await prisma.quizBlock.deleteMany();
  await prisma.quiz.deleteMany();

  // Create a quiz
  const quiz = await prisma.quiz.create({
    data: {
      title: 'React Basics Quiz',
      published: true,
      publishedAt: new Date(),
      blocks: {
        create: [
          {
            type: BlockEnum.HEADING,
            properties: {
              text: 'Welcome to the React Basics Quiz!',
            },
          },
          {
            type: BlockEnum.QUESTION,
            properties: {
              kind: QuestionKindEnum.SINGLE,
              title: 'What is React?',
              options: [
                { id: randomUUID(), text: 'A JavaScript library for building UIs' },
                { id: randomUUID(), text: 'A CSS framework' },
                { id: randomUUID(), text: 'A database system' },
                { id: randomUUID(), text: 'A programming language' },
              ],
              correctOptionIds: [],
            },
          },
          {
            type: BlockEnum.QUESTION,
            properties: {
              kind: QuestionKindEnum.MULTI,
              title: 'Which of the following are React features?',
              options: [
                { id: randomUUID(), text: 'JSX' },
                { id: randomUUID(), text: 'Virtual DOM' },
                { id: randomUUID(), text: 'Two-way binding by default' },
                { id: randomUUID(), text: 'Component-based' },
              ],
              correctOptionIds: [],
            },
          },
          {
            type: BlockEnum.BUTTON,
            properties: {
              nextLabel: 'Next',
              previousLabel: 'Back',
              submitLabel: 'Submit Quiz',
            },
          },
          {
            type: BlockEnum.FOOTER,
            properties: {
              text: 'Thank you for attempting the quiz!',
            },
          },
        ],
      },
    },
    include: { blocks: true },
  });

  console.log('✅ Quiz seeded:', quiz.id);
}

main()
  .then(() => {
    console.log('🌱 Seed completed.');
  })
  .catch((e) => {
    console.error('❌ Error during seed', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
