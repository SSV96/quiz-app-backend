/*
  Warnings:

  - You are about to drop the column `blockType` on the `QuizBlock` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `QuizBlock` table. All the data in the column will be lost.
  - Added the required column `type` to the `QuizBlock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."QuizBlock" DROP COLUMN "blockType",
DROP COLUMN "order",
ADD COLUMN     "type" "public"."BlockType" NOT NULL;
