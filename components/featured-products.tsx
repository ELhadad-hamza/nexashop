import { featuredProducts } from "@/lib/products";

export default function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Sélection
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            Produits vedettes
          </h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="h-56 bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300" />
            <div className="space-y-3 p-5">
              <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                {product.category}
              </span>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold">{product.price} DH</p>
                <button className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}