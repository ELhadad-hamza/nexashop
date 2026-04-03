import Navbar from "@/components/navbar";
import CheckoutContent from "@/components/checkout-content";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Checkout
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Finaliser la commande
        </h1>

        <CheckoutContent />
      </section>
    </main>
  );
}