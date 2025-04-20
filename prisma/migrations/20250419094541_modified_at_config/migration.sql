/*
  Warnings:

  - Added the required column `parameterName` to the `Configuration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parameterValue` to the `Configuration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Configuration` ADD COLUMN `parameterName` VARCHAR(191) NOT NULL,
    ADD COLUMN `parameterValue` VARCHAR(191) NOT NULL;
