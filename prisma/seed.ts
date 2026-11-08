import { prisma } from "@/lib/prisma";

const zodiacSigns = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpius",
  "sagittarius",
  "capricornus",
  "aquarius",
  "pisces",
];

async function main() {
  for (const zodiacSign of zodiacSigns) {
  await prisma.user.upsert({
    where: {
      id: `dummy-${zodiacSign}`,
    },
    update: {},
    create: {
      id: `dummy-${zodiacSign}`,
      zodiacSign,
      isDummy: true,
      isGuest: false,
    },
  });
}
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });