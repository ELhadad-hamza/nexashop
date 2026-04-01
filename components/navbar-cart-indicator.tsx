"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export default function NavbarCartIndicator() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="relative text-sm font-medium hover:text-zinc-600">
      Panier
      {totalItems > 0 && (
        <span className="ml-2 rounded-full bg-zinc-900 px-2 py-1 text-xs text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}