-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "breed" TEXT NOT NULL,
    "name_iv" TEXT NOT NULL DEFAULT 'default_iv',
    "breed_iv" TEXT NOT NULL DEFAULT 'default_iv'
);
INSERT INTO "new_Cat" ("age", "breed", "id", "name") SELECT "age", "breed", "id", "name" FROM "Cat";
DROP TABLE "Cat";
ALTER TABLE "new_Cat" RENAME TO "Cat";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
