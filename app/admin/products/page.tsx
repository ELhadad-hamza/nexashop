import Navbar from "@/components/navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteProductButton from "@/components/delete-product-button";

export default async function AdminProductsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Administration
            </p>
            <h1 className="text-4xl font-bold tracking-tight">
              Gestion des produits
            </h1>
          </div>

          <Link
            href="/admin/products/new"
            className="rounded-full bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-800"
          >
            Nouveau produit
          </Link>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <div className="grid grid-cols-6 gap-4 border-b border-zinc-200 px-6 py-4 text-sm font-semibold text-zinc-500">
            <span>Nom</span>
            <span>Catégorie</span>
            <span>Prix</span>
            <span>Stock</span>
            <span>Vedette</span>
            <span>Actions</span>
          </div>

          {products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-6 gap-4 border-b border-zinc-100 px-6 py-4 text-sm"
            >
              <span className="font-medium text-zinc-900">{product.name}</span>
              <span>{product.category.name}</span>
              <span>{product.price} DH</span>
              <span>{product.stock}</span>
              <span>{product.isFeatured ? "Oui" : "Non"}</span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50"
                >
                  Modifier
                </Link>

                <DeleteProductButton productId={product.id} />
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="px-6 py-10 text-center text-zinc-500">
              Aucun produit trouvé.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}