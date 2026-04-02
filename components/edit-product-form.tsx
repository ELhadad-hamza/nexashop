"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  imageUrl: string | null;
  isFeatured: boolean;
};

type EditProductFormProps = {
  product: Product;
  categories: Category[];
};

export default function EditProductForm({
  product,
  categories,
}: EditProductFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: String(product.price),
    stock: String(product.stock),
    categoryId: product.categoryId,
    imageUrl: product.imageUrl ?? "",
    isFeatured: product.isFeatured,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch(`/api/admin/products/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Erreur lors de la modification.");
      setLoading(false);
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium">Nom</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Slug</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="min-h-[120px] w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Prix</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Stock</label>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Catégorie</label>
          <select
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Image URL</label>
          <input
            type="text"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
          />
        </div>

        <label className="flex items-center gap-3 text-sm font-medium">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) =>
              setForm({ ...form, isFeatured: e.target.checked })
            }
          />
          Produit vedette
        </label>

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
          {loading ? "Modification..." : "Enregistrer les modifications"}
        </button>
      </form>
    </div>
  );
}