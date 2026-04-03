import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

type CheckoutItem = {
  id: string;
  quantity: number;
};

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Vous devez être connecté." }, { status: 401 });
  }

  try {
    const body = await request.json();

    const {
      fullName,
      phone,
      city,
      addressLine,
      notes,
      items,
    }: {
      fullName: string;
      phone: string;
      city: string;
      addressLine: string;
      notes?: string;
      items: CheckoutItem[];
    } = body;

    if (!fullName || !phone || !city || !addressLine || !items?.length) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 }
      );
    }

    const productIds = items.map((item) => item.id);

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    if (products.length !== items.length) {
      return NextResponse.json(
        { error: "Un ou plusieurs produits sont introuvables." },
        { status: 400 }
      );
    }

    const productMap = new Map(products.map((product) => [product.id, product]));

    const normalizedItems = items.map((item) => {
      const product = productMap.get(item.id);

      if (!product) {
        throw new Error("Produit introuvable.");
      }

      const quantity = Math.max(1, Number(item.quantity) || 1);

      if (product.stock < quantity) {
        throw new Error(`Stock insuffisant pour ${product.name}.`);
      }

      return {
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        unitPrice: product.price,
        quantity,
        subtotal: product.price * quantity,
      };
    });

    const total = normalizedItems.reduce((sum, item) => sum + item.subtotal, 0);

    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          userId: session.user.id,
          fullName,
          phone,
          city,
          addressLine,
          notes: notes || null,
          total,
          items: {
            create: normalizedItems,
          },
        },
      });

      for (const item of normalizedItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return createdOrder;
    });

    return NextResponse.json(
      {
        message: "Commande créée avec succès.",
        orderId: order.id,
      },
      { status: 201 }
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Erreur serveur lors de la création de la commande.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}