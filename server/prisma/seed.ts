import { PrismaClient } from '@prisma/client';
import { words } from '../prisma/seed-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting data load...');
  await prisma.word.createMany({
    data: words,
    skipDuplicates: true,
  });
  console.log(`Complete , words proceed ${words.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
