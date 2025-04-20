/*
  Warnings:

  - You are about to drop the column `parameterName` on the `Configuration` table. All the data in the column will be lost.
  - You are about to drop the column `parameterValue` on the `Configuration` table. All the data in the column will be lost.
  - You are about to drop the column `activationMode` on the `IrrigationEvent` table. All the data in the column will be lost.
  - Added the required column `deviceId` to the `Configuration` table without a default value. This is not possible if the table is not empty.
  - Made the column `memberId` on table `Configuration` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `deviceId` to the `IrrigationEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Configuration` DROP FOREIGN KEY `Configuration_memberId_fkey`;

-- DropIndex
DROP INDEX `Configuration_memberId_fkey` ON `Configuration`;

-- AlterTable
ALTER TABLE `Configuration` DROP COLUMN `parameterName`,
    DROP COLUMN `parameterValue`,
    ADD COLUMN `deviceId` VARCHAR(191) NOT NULL,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `memberId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `IrrigationEvent` DROP COLUMN `activationMode`,
    ADD COLUMN `deviceId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Device` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `relayToPump` BOOLEAN NULL,
    `moistureThresholdHigh` DOUBLE NULL,
    `moistureThresholdLow` DOUBLE NULL,
    `pumpMode` BOOLEAN NULL,
    `pumpState` BOOLEAN NULL,
    `displayMessage` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Configuration` ADD CONSTRAINT `Configuration_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `Device`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Configuration` ADD CONSTRAINT `Configuration_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IrrigationEvent` ADD CONSTRAINT `IrrigationEvent_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `Device`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
