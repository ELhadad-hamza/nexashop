import Navbar from "@/components/navbar";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import OrderStatusBadge from "@/components/order-status-badge";
import AdminOrderStatusSelect from "@/components/admin-order-status-select";

type AdminOrderDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminOrderDetailsPage({
  params,
}: AdminOrderDetailsPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Administration
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Détail de la commande
        </h1>

        <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Produits commandés</h2>

            <div className="mt-6 space-y-4">
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

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Informations</h2>

            <div className="mt-6 space-y-3 text-sm">
              <p>
                <span className="font-medium">Référence :</span> {order.id}
              </p>
              <p>
                <span className="font-medium">Client :</span> {order.user.name}
              </p>
              <p>
                <span className="font-medium">Email :</span> {order.user.email}
              </p>
              <p>
                <span className="font-medium">Téléphone :</span> {order.phone}
              </p>
              <p>
                <span className="font-medium">Ville :</span> {order.city}
              </p>
              <p>
                <span className="font-medium">Adresse :</span> {order.addressLine}
              </p>
              <p>
                <span className="font-medium">Notes :</span> {order.notes || "-"}
              </p>
              <p>
                <span className="font-medium">Total :</span> {order.total} DH
              </p>
              <div className="pt-2">
                <OrderStatusBadge status={order.status} />
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-sm font-medium">Changer le statut</p>
              <AdminOrderStatusSelect
                orderId={order.id}
                currentStatus={order.status}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}