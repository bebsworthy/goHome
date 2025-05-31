-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "duplicateOfId" INTEGER,
ADD COLUMN     "similarityScore" DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_duplicateOfId_fkey" FOREIGN KEY ("duplicateOfId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
