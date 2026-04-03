import Navbar from "@/components/navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import OrderStatusBadge from "@/components/order-status-badge";

export default async function AccountOrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Mon compte
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Mes commandes
        </h1>

        {orders.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center text-zinc-500">
            Vous n&apos;avez encore passé aucune commande.
            <div className="mt-6">
              <Link
                href="/shop"
                className="rounded-full bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-800"
              >
                Aller à la boutique
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-zinc-500">
                      Référence : {order.id}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      Date : {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <OrderStatusBadge status={order.status} />
                    <span className="text-xl font-bold">{order.total} DH</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-3"
                    >
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-zinc-500">
                          {item.quantity} x {item.unitPrice} DH
                        </p>
                      </div>

                      <p className="font-semibold">{item.subtotal} DH</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}