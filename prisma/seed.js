require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const sneakers = await prisma.category.create({
    data: {
      name: "Sneakers",
      slug: "sneakers",
    },
  });

  const accessoires = await prisma.category.create({
    data: {
      name: "Accessoires",
      slug: "accessoires",
    },
  });

  const sacs = await prisma.category.create({
    data: {
      name: "Sacs",
      slug: "sacs",
    },
  });

  const vetements = await prisma.category.create({
    data: {
      name: "Vêtements",
      slug: "vetements",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Urban Sneakers",
        slug: "urban-sneakers",
        description: "Sneakers modernes au style urbain et premium.",
        price: 899,
        stock: 12,
        isFeatured: true,
        imageUrl: null,
        categoryId: sneakers.id,
      },
      {
        name: "Minimal Watch",
        slug: "minimal-watch",
        description: "Montre minimaliste élégante pour un look moderne.",
        price: 649,
        stock: 8,
        isFeatured: true,
        imageUrl: null,
        categoryId: accessoires.id,
      },
      {
        name: "Classic Backpack",
        slug: "classic-backpack",
        description: "Sac à dos pratique avec design épuré.",
        price: 499,
        stock: 15,
        isFeatured: true,
        imageUrl: null,
        categoryId: sacs.id,
      },
      {
        name: "Premium Hoodie",
        slug: "premium-hoodie",
        description: "Hoodie confortable avec finition premium.",
        price: 559,
        stock: 20,
        isFeatured: true,
        imageUrl: null,
        categoryId: vetements.id,
      },
      {
        name: "Runner Pro",
        slug: "runner-pro",
        description: "Chaussures sportives légères et confortables.",
        price: 799,
        stock: 9,
        isFeatured: false,
        imageUrl: null,
        categoryId: sneakers.id,
      },
      {
        name: "Leather Wallet",
        slug: "leather-wallet",
        description: "Portefeuille sobre en simili cuir.",
        price: 299,
        stock: 18,
        isFeatured: false,
        imageUrl: null,
        categoryId: accessoires.id,
      },
    ],
  });

  console.log("Seed terminé avec succès.");
}

main()
  .catch((e) => {
    console.error("Erreur seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });