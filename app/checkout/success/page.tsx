import Navbar from "@/components/navbar";
import Link from "next/link";

type SuccessPageProps = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { orderId } = await searchParams;

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Commande confirmée
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Merci pour votre commande
        </h1>

        <p className="mt-4 text-zinc-600">
          Votre commande a bien été enregistrée.
        </p>

        {orderId && (
          <p className="mt-3 text-sm text-zinc-500">
            Référence : <span className="font-medium">{orderId}</span>
          </p>
        )}

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/shop"
            className="rounded-full bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-800"
          >
            Continuer les achats
          </Link>

          <Link
            href="/"
            className="rounded-full border border-zinc-300 px-6 py-3 font-medium hover:bg-white"
          >
            Retour accueil
          </Link>
        </div>
      </section>
    </main>
  );
}