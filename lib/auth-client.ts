"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        throw new Error("Email ou mot de passe incorrect.");
      }
    }

    throw error;
  }
}

export async function logoutAction() {
  await signOut({
    redirectTo: "/",
  });
}