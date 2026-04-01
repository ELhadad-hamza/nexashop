import Navbar from "@/components/navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AddProductForm from "@/components/add-product-form";

export default async function NewProductPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Administration
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Ajouter un produit
        </h1>

        <p className="mt-4 text-zinc-600">
          Remplissez le formulaire pour créer un nouveau produit.
        </p>

        <AddProductForm />
      </section>
    </main>
  );
}