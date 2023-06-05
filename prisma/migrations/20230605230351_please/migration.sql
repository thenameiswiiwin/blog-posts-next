-- DropIndex
DROP INDEX "Post_ownerId_idx";

-- CreateIndex
CREATE INDEX "Post_ownerId_id_idx" ON "Post"("ownerId", "id");
