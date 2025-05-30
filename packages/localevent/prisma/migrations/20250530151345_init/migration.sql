-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "dates" TIMESTAMP(3)[],
    "startTime" TEXT,
    "endTime" TEXT,
    "location" TEXT NOT NULL,
    "city" TEXT,
    "description" TEXT,
    "organizer" TEXT,
    "price" TEXT,
    "category" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "rawText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
