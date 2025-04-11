-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_id_fkey";

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
