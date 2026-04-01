import Navbar from "@/components/navbar";
import RegisterForm from "@/components/register-form";

export default function RegisterPage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-md px-6 py-16">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Inscription
        </p>
        <h1 className="text-4xl font-bold tracking-tight">Créer un compte</h1>

        <RegisterForm />
      </section>
    </main>
  );
}