"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteProductButton({ productId }: { productId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm("Voulez-vous vraiment supprimer ce produit ?");

    if (!confirmed) return;

    setLoading(true);

    const response = await fetch(`/api/admin/products/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.refresh();
      return;
    }

    alert("Erreur lors de la suppression.");
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded-full border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
    >
      {loading ? "Suppression..." : "Supprimer"}
    </button>
  );
}