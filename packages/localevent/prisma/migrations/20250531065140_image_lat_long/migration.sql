-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('NEW', 'PUBLISHED', 'BLOCKED');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "images" TEXT[],
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'BLOCKED';
