"use client";

import { useCart } from "@/components/cart-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutContent() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    addressLine: "",
    notes: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Votre panier est vide.");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        items: items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Erreur lors de la création de la commande.");
      setLoading(false);
      return;
    }

    clearCart();
    router.push(`/checkout/success?orderId=${data.orderId}`);
    router.refresh();
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Informations de livraison</h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium">Nom complet</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Téléphone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Ville</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Adresse</label>
            <textarea
              value={form.addressLine}
              onChange={(e) => setForm({ ...form, addressLine: e.target.value })}
              className="min-h-[120px] w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="min-h-[100px] w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </div>

          {error && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-zinc-900 px-4 py-3 font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
          >
            {loading ? "Validation..." : "Confirmer la commande"}
          </button>
        </form>
      </div>

      <div className="h-fit rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
          Résumé
        </p>

        <h2 className="mt-2 text-2xl font-bold">Votre commande</h2>

        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-zinc-500">
                  {item.quantity} x {item.price} DH
                </p>
              </div>

              <p className="font-semibold">{item.quantity * item.price} DH</p>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-zinc-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-zinc-600">Total</span>
            <span className="text-2xl font-bold">{totalPrice} DH</span>
          </div>
        </div>
      </div>
    </div>
  );
}