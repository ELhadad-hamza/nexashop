"use client";

import { useCart } from "@/components/cart-provider";
import Link from "next/link";

export default function CartPageContent() {
  const {
    items,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="mt-8 rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center">
        <p className="text-zinc-500">Votre panier est vide.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-800"
        >
          Aller à la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="mt-1 text-zinc-500">{item.price} DH</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="rounded-full border border-zinc-300 px-4 py-2"
                >
                  -
                </button>

                <span className="min-w-[32px] text-center font-medium">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="rounded-full border border-zinc-300 px-4 py-2"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold">
                  {item.price * item.quantity} DH
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-fit rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
          Résumé
        </p>

        <h2 className="mt-2 text-2xl font-bold">Commande</h2>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-zinc-600">Total</span>
          <span className="text-2xl font-bold">{totalPrice} DH</span>
        </div>

        <Link
          href="/checkout"
          className="mt-6 block w-full rounded-full bg-zinc-900 px-4 py-3 text-center font-medium text-white hover:bg-zinc-800"
        >
          Passer au checkout
        </Link>

        <button
          onClick={clearCart}
          className="mt-3 w-full rounded-full border border-zinc-300 px-4 py-3 font-medium hover:bg-zinc-50"
        >
          Vider le panier
        </button>
      </div>
    </div>
  );
}