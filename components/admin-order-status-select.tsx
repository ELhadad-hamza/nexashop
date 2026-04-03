"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type AdminOrderStatusSelectProps = {
  orderId: string;
  currentStatus: string;
};

const statuses = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function AdminOrderStatusSelect({
  orderId,
  currentStatus,
}: AdminOrderStatusSelectProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function handleChange(newStatus: string) {
    setStatus(newStatus);
    setLoading(true);

    const response = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      alert("Erreur lors de la mise à jour du statut.");
      setLoading(false);
      return;
    }

    router.refresh();
    setLoading(false);
  }

  return (
    <select
      value={status}
      disabled={loading}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-2xl border border-zinc-300 px-4 py-2 outline-none focus:border-zinc-500"
    >
      {statuses.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}