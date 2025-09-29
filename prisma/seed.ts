import { PrismaClient, BlockType } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// 10 realistic questions
const questionTemplates = [
  { title: 'What is the capital of India?', options: ['New Delhi','Mumbai','Kolkata','Chennai'], correct: ['New Delhi'], kind: 'SINGLE' },
  { title: 'Who wrote the national anthem of India?', options: ['Tagore','Gandhi','Nehru','Bose'], correct: ['Tagore'], kind: 'SINGLE' },
  { title: 'Which planet is known as the Red Planet?', options: ['Mars','Venus','Jupiter','Mercury'], correct: ['Mars'], kind: 'SINGLE' },
  { title: 'Select the prime numbers.', options: ['2','3','4','5'], correct: ['2','3','5'], kind: 'MULTI' },
  { title: 'Select programming languages.', options: ['Python','HTML','C++','CSS'], correct: ['Python','C++'], kind: 'MULTI' },
  { title: 'Which of these are Indian states?', options: ['Delhi','London','Kerala','Tokyo'], correct: ['Delhi','Kerala'], kind: 'MULTI' },
  { title: 'Explain the meaning of gravity.', options: [], correct: [], kind: 'TEXT' },
  { title: 'Describe photosynthesis.', options: [], correct: [], kind: 'TEXT' },
  { title: 'Write a short note on democracy.', options: [], correct: [], kind: 'TEXT' },
  { title: 'What is the formula of water?', options: [], correct: ['H2O'], kind: 'TEXT' },
];

// Helper to generate a question block
function generateQuestionBlock(template: any) {
  let options = template.options.map((text: string) => ({ id: faker.string.uuid(), text }));
  let correctOptionIds = [];

  if (template.kind !== 'TEXT') {
    correctOptionIds = options.filter((o: any) => template.correct.includes(o.text)).map((o: any) => o.id);
  }

  return {
    type: BlockType.QUESTION,
    properties: {
      title: template.title,
      kind: template.kind,
      options: options.length ? options : undefined,
      correctOptionIds: correctOptionIds.length ? correctOptionIds : undefined,
    },
  };
}

// Generate blocks for a single quiz
function generateQuizBlocks() {
  // Pick 1 SINGLE, 1 MULTI, 1 TEXT question randomly
  const single = faker.helpers.arrayElement(questionTemplates.filter(q => q.kind === 'SINGLE'));
  const multi = faker.helpers.arrayElement(questionTemplates.filter(q => q.kind === 'MULTI'));
  const text = faker.helpers.arrayElement(questionTemplates.filter(q => q.kind === 'TEXT'));

  return [
    { type: BlockType.HEADING, properties: { text: faker.company.catchPhrase() } },
    generateQuestionBlock(single),
    generateQuestionBlock(multi),
    generateQuestionBlock(text),
    { type: BlockType.BUTTON, properties: { nextLabel: 'Next', previousLabel: 'Back', submitLabel: 'Submit' } },
    { type: BlockType.FOOTER, properties: { text: 'Thank you for taking this quiz!' } },
  ];
}

async function main() {
  console.log('🌱 Seeding database with realistic quizzes...');

  for (let i = 0; i < 5; i++) {
    const quiz = await prisma.quiz.create({
      data: {
        title: faker.commerce.productName() + ' Quiz',
        published: faker.datatype.boolean(),
        publishedAt: faker.date.recent(),
        blocks: { create: generateQuizBlocks() },
      },
      include: { blocks: true },
    });
    console.log(`✅ Created quiz: ${quiz.title} (${quiz.id})`);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => await prisma.$disconnect());
