import Navbar from "@/components/navbar";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="h-[420px] rounded-[1.5rem] bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300" />
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {product.category.name}
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {product.name}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              {product.description}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-3xl font-bold">{product.price} DH</span>
              <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-600">
                Stock : {product.stock}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-800">
                Ajouter au panier
              </button>

              <button className="rounded-full border border-zinc-300 px-6 py-3 font-medium hover:bg-white">
                Acheter maintenant
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}