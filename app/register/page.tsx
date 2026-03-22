import Navbar from "@/components/navbar";

export default function RegisterPage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-md px-6 py-16">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Inscription
        </p>
        <h1 className="text-4xl font-bold tracking-tight">Créer un compte</h1>

        <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <form className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Nom complet</label>
              <input
                type="text"
                placeholder="Hamza El Hadad"
                className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="exemple@email.com"
                className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Mot de passe</label>
              <input
                type="password"
                placeholder="********"
                className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-500"
              />
            </div>

            <button className="w-full rounded-full bg-zinc-900 px-4 py-3 font-medium text-white hover:bg-zinc-800">
              Créer un compte
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}