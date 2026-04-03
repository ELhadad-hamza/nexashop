import Navbar from "@/components/navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import OrderStatusBadge from "@/components/order-status-badge";

export default async function AdminOrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  const orders = await prisma.order.findMany({
    include: {
      user: true,
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-center justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Administration
            </p>
            <h1 className="text-4xl font-bold tracking-tight">
              Gestion des commandes
            </h1>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <div className="grid grid-cols-6 gap-4 border-b border-zinc-200 px-6 py-4 text-sm font-semibold text-zinc-500">
            <span>Référence</span>
            <span>Client</span>
            <span>Total</span>
            <span>Statut</span>
            <span>Date</span>
            <span>Action</span>
          </div>

          {orders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-6 gap-4 border-b border-zinc-100 px-6 py-4 text-sm"
            >
              <span className="truncate">{order.id}</span>
              <span>{order.user.name}</span>
              <span>{order.total} DH</span>
              <span>
                <OrderStatusBadge status={order.status} />
              </span>
              <span>
                {new Date(order.createdAt).toLocaleDateString("fr-FR")}
              </span>
              <span>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50"
                >
                  Voir
                </Link>
              </span>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="px-6 py-10 text-center text-zinc-500">
              Aucune commande trouvée.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}