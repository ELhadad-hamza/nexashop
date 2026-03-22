import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexaShop",
  description: "Projet e-commerce moderne créé par Hamza El Hadad",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-stone-50 text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}