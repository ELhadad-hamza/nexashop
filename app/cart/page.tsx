import Navbar from "@/components/navbar";
import CartPageContent from "@/components/cart-page-content";

export default function CartPage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Panier
        </p>
        <h1 className="text-4xl font-bold tracking-tight">Votre panier</h1>

        <CartPageContent />
      </section>
    </main>
  );
}