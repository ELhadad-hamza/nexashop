"use client";

import { logoutAction } from "@/lib/auth-client";

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit" className="text-sm font-medium hover:text-zinc-600">
        Déconnexion
      </button>
    </form>
  );
}