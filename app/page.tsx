import Link from "next/link";
import Navbar from "@/components/navbar";
import FeaturedProducts from "@/components/featured-products";

export default function Home() {
  return (
    <main>
      <Navbar />

      <section className="mx-auto grid min-h-[85vh] max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Modern E-commerce Experience
          </p>

          <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Build your style with a premium shopping experience
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
            NexaShop est un projet e-commerce moderne conçu pour présenter une
            expérience d’achat élégante, rapide et professionnelle.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-800"
            >
              Voir la boutique
            </Link>

            <Link
              href="/register"
              className="rounded-full border border-zinc-300 px-6 py-3 font-medium hover:bg-white"
            >
              Créer un compte
            </Link>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-2xl font-bold">+120</p>
              <p className="text-zinc-500">Produits</p>
            </div>
            <div>
              <p className="text-2xl font-bold">24h</p>
              <p className="text-zinc-500">Livraison</p>
            </div>
            <div>
              <p className="text-2xl font-bold">4.9/5</p>
              <p className="text-zinc-500">Avis clients</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-xl">
          <div className="grid gap-4">
            <div className="h-56 rounded-[1.5rem] bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-900" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-36 rounded-[1.5rem] bg-zinc-200" />
              <div className="h-36 rounded-[1.5rem] bg-zinc-300" />
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts />

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[2rem] bg-zinc-900 px-8 py-12 text-white">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-300">
            Pourquoi ce projet
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            Un projet portfolio professionnel
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-300">
            Ce projet servira de vitrine technique pour GitHub et pour ton
            portfolio personnel, avec une architecture full-stack moderne et un
            design premium.
          </p>
        </div>
      </section>
    </main>
  );
}