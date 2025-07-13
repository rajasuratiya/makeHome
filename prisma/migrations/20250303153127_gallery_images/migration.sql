-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "galleryImageId" INTEGER;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_galleryImageId_fkey" FOREIGN KEY ("galleryImageId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
