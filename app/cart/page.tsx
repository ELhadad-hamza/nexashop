import Navbar from "@/components/navbar";

export default function CartPage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Panier
        </p>
        <h1 className="text-4xl font-bold tracking-tight">Votre panier</h1>
        <div className="mt-8 rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center text-zinc-500">
          Le panier sera connecté à la vraie logique dans la prochaine phase.
        </div>
      </section>
    </main>
  );
}