-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "updated_at" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Task_id_idx" ON "Task"("id");

-- CreateIndex
CREATE INDEX "Task_userId_idx" ON "Task"("userId");

-- CreateIndex
CREATE INDEX "Users_id_idx" ON "Users"("id");
