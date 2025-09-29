-- DropForeignKey
ALTER TABLE "public"."QuizBlock" DROP CONSTRAINT "QuizBlock_quizId_fkey";

-- AddForeignKey
ALTER TABLE "public"."QuizBlock" ADD CONSTRAINT "QuizBlock_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "public"."Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
