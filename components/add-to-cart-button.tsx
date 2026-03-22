"use client";

import { useCart } from "@/components/cart-provider";

type AddToCartButtonProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    imageUrl?: string | null;
  };
};

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(product)}
      className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
    >
      Ajouter au panier
    </button>
  );
}