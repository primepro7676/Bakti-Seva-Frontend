const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.updateMany({
    where: { slug: 'bhagavad-gita-deluxe' },
    data: { imageUrl: '/images/bhagavad_gita_deluxe.jpg' }
  });
  console.log('Updated!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
