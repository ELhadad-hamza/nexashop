import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      price,
      stock,
      categoryId,
      imageUrl,
      isFeatured,
    } = body;

    if (!name || !slug || !description || !price || !stock || !categoryId) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: "Un produit avec ce slug existe déjà." },
        { status: 409 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        stock,
        categoryId,
        imageUrl: imageUrl || null,
        isFeatured: Boolean(isFeatured),
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur lors de l'ajout du produit." },
      { status: 500 }
    );
  }
}