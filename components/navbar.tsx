import Link from "next/link";
import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";
import NavbarCartIndicator from "@/components/navbar-cart-indicator";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          NexaShop
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium hover:text-zinc-600">
            Accueil
          </Link>

          <Link href="/shop" className="text-sm font-medium hover:text-zinc-600">
            Boutique
          </Link>

          <NavbarCartIndicator />

          {session?.user ? (
            <>
              <span className="text-sm text-zinc-500">
                Bonjour, {session.user.name}
              </span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:text-zinc-600">
                Connexion
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Inscription
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}