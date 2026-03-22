import Navbar from "@/components/navbar";
import { featuredProducts } from "@/lib/products";

export default function ShopPage() {
  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Boutique
        </p>
        <h1 className="text-4xl font-bold tracking-tight">Tous les produits</h1>
        <p className="mt-4 max-w-2xl text-zinc-600">
          Voici la première version de la boutique. Plus tard, on ajoutera les
          filtres, la recherche et la connexion à la base de données.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 h-48 rounded-2xl bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300" />
              <p className="text-sm text-zinc-500">{product.category}</p>
              <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
              <p className="mt-3 text-xl font-bold">{product.price} DH</p>
              <button className="mt-4 w-full rounded-full bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800">
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}