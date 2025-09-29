import { PrismaClient, BlockType } from '@prisma/client';

const prisma = new PrismaClient();

const realQuestions = [
  {
    title: 'What is the capital of France?',
    kind: 'SINGLE',
    options: [{ text: 'Paris' }, { text: 'Berlin' }, { text: 'Madrid' }, { text: 'Rome' }],
    correct: ['Paris'],
  },
  {
    title: 'Which planet is known as the Red Planet?',
    kind: 'SINGLE',
    options: [{ text: 'Mars' }, { text: 'Venus' }, { text: 'Jupiter' }, { text: 'Saturn' }],
    correct: ['Mars'],
  },
  {
    title: 'Select the prime numbers.',
    kind: 'MULTI',
    options: [{ text: '2' }, { text: '3' }, { text: '4' }, { text: '5' }],
    correct: ['2', '3', '5'],
  },
  {
    title: 'Describe photosynthesis.',
    kind: 'TEXT',
  },
  {
    title: 'Who wrote the play "Romeo and Juliet"?',
    kind: 'SINGLE',
    options: [
      { text: 'William Shakespeare' },
      { text: 'Charles Dickens' },
      { text: 'Jane Austen' },
      { text: 'Mark Twain' },
    ],
    correct: ['William Shakespeare'],
  },
];

function generateQuestionBlock(q: (typeof realQuestions)[number]) {
  const options =
    q.kind !== 'TEXT'
      ? (q.options?.map((opt) => ({ id: crypto.randomUUID(), text: opt.text })) ?? [])
      : [];

  let correctOptionIds: string[] = [];
  if (q.kind !== 'TEXT' && q.correct) {
    correctOptionIds = options.filter((o) => q.correct?.includes(o.text)).map((o) => o.id);
  }

  return {
    type: BlockType.QUESTION,
    properties: {
      title: q.title,
      kind: q.kind,
      options: options.length ? options : undefined,
      correctOptionIds: correctOptionIds.length ? correctOptionIds : undefined,
    },
  };
}

function generateQuiz(title: string, questions: (typeof realQuestions)[number][]) {
  return {
    title,
    published: true,
    publishedAt: new Date(),
    blocks: {
      create: [
        { type: BlockType.HEADING, properties: { text: `${title} - Welcome!` } },
        ...questions.map(generateQuestionBlock),
        {
          type: BlockType.BUTTON,
          properties: { nextLabel: 'Next', previousLabel: 'Back', submitLabel: 'Submit' },
        },
        { type: BlockType.FOOTER, properties: { text: 'Thanks for participating!' } },
      ],
    },
  };
}

async function main() {
  console.log(' Seeding 2 quizzes with real questions...');
  await prisma.quiz.create({
    data: generateQuiz('General Knowledge Quiz', realQuestions.slice(0, 3)),
  });

  await prisma.quiz.create({
    data: generateQuiz('Mixed Topics Quiz', realQuestions.slice(3)),
  });

  console.log(' Done seeding quizzes!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
