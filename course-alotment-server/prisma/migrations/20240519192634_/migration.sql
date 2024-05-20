/*
  Warnings:

  - A unique constraint covering the columns `[teacherid]` on the table `teachers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `teachers_teacherid_key` ON `teachers`(`teacherid`);
