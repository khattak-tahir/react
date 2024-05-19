/*
  Warnings:

  - A unique constraint covering the columns `[aridno]` on the table `students` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `students_aridno_key` ON `students`(`aridno`);
