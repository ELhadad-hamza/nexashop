import Navbar from "@/components/navbar";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Boutique
        </p>

        <h1 className="text-4xl font-bold tracking-tight">Tous les produits</h1>

        <p className="mt-4 max-w-2xl text-zinc-600">
          Cette version lit les produits directement depuis PostgreSQL avec Prisma.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <Link href={`/product/${product.slug}`}>
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="mb-4 h-48 w-full rounded-2xl object-cover"
                  />
                ) : (
                  <div className="mb-4 h-48 rounded-2xl bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300" />
                )}
              </Link>

              <p className="text-sm text-zinc-500">{product.category.name}</p>

              <Link href={`/product/${product.slug}`}>
                <h2 className="mt-2 text-lg font-semibold hover:text-zinc-600">
                  {product.name}
                </h2>
              </Link>

              <p className="mt-2 text-sm text-zinc-500">{product.description}</p>

              <p className="mt-3 text-xl font-bold">{product.price} DH</p>

              <div className="mt-4 flex justify-between gap-3">
                <Link
                  href={`/product/${product.slug}`}
                  className="rounded-full border border-zinc-300 px-4 py-2 text-center text-sm hover:bg-white"
                >
                  Voir
                </Link>

                <Link
                  href={`/product/${product.slug}`}
                  className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
                >
                  Acheter
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}