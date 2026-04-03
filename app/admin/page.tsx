import Navbar from "@/components/navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  const productsCount = await prisma.product.count();
  const categoriesCount = await prisma.category.count();
  const usersCount = await prisma.user.count();

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Administration
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Dashboard Admin
        </h1>

        <p className="mt-4 max-w-2xl text-zinc-600">
          Gérez les produits, les catégories et les utilisateurs de NexaShop.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-500">Produits</p>
            <p className="mt-2 text-3xl font-bold">{productsCount}</p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-500">Catégories</p>
            <p className="mt-2 text-3xl font-bold">{categoriesCount}</p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-500">Utilisateurs</p>
            <p className="mt-2 text-3xl font-bold">{usersCount}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/admin/products"
            className="rounded-full bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-800"
          >
            Gérer les produits
          </Link>

          <Link
            href="/admin/products/new"
            className="rounded-full border border-zinc-300 px-6 py-3 font-medium hover:bg-white"
          >
            Ajouter un produit
          </Link>
          <Link
  href="/admin/orders"
  className="rounded-full border border-zinc-300 px-6 py-3 font-medium hover:bg-white"
>
  Gérer les commandes
</Link>
        </div>
      </section>
    </main>
  );
}