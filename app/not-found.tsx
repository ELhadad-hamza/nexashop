import Link from "next/link";
import Navbar from "@/components/navbar";

export default function NotFound() {
  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Erreur 404
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Page introuvable
        </h1>
        <p className="mt-4 text-zinc-600">
          Le produit ou la page que vous cherchez n’existe pas.
        </p>

        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-800"
        >
          Retour à la boutique
        </Link>
      </section>
    </main>
  );
}