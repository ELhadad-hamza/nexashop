import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "");
        const password = String(credentials?.password ?? "");

        if (!email || !password) {
          console.log("Champs login manquants");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        console.log("Utilisateur trouvé :", user?.email ?? null);

        if (!user) {
          console.log("Aucun utilisateur avec cet email");
          return null;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        console.log("Mot de passe valide :", isValidPassword);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
  if (session.user) {
    session.user.id = token.sub ?? "";
    session.user.role = typeof token.role === "string" ? token.role : "customer";
  }

  return session;
},
  },
  pages: {
    signIn: "/login",
  },
});