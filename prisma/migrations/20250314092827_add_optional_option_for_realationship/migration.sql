/*
  Warnings:

  - You are about to alter the column `activationMode` on the `IrrigationEvent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.
  - Added the required column `status` to the `IrrigationEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Configuration` DROP FOREIGN KEY `Configuration_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `IrrigationEvent` DROP FOREIGN KEY `IrrigationEvent_sensorDataId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `SensorData` DROP FOREIGN KEY `SensorData_sensorId_fkey`;

-- DropIndex
DROP INDEX `Configuration_memberId_fkey` ON `Configuration`;

-- DropIndex
DROP INDEX `IrrigationEvent_sensorDataId_fkey` ON `IrrigationEvent`;

-- DropIndex
DROP INDEX `Notification_memberId_fkey` ON `Notification`;

-- DropIndex
DROP INDEX `SensorData_sensorId_fkey` ON `SensorData`;

-- AlterTable
ALTER TABLE `Configuration` MODIFY `memberId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `IrrigationEvent` ADD COLUMN `status` VARCHAR(191) NOT NULL,
    MODIFY `activationMode` BOOLEAN NOT NULL,
    MODIFY `sensorDataId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Notification` MODIFY `memberId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `SensorData` MODIFY `sensorId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Configuration` ADD CONSTRAINT `Configuration_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SensorData` ADD CONSTRAINT `SensorData_sensorId_fkey` FOREIGN KEY (`sensorId`) REFERENCES `Sensor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IrrigationEvent` ADD CONSTRAINT `IrrigationEvent_sensorDataId_fkey` FOREIGN KEY (`sensorDataId`) REFERENCES `SensorData`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
