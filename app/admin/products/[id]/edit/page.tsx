import Navbar from "@/components/navbar";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import EditProductForm from "@/components/edit-product-form";

type EditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: EditPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Administration
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Modifier le produit
        </h1>

        <EditProductForm product={product} categories={categories} />
      </section>
    </main>
  );
}