"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export function LoginBtn() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/register" })}
      className="flex gap-2 items-center border border-neutral-900 p-2 rounded-md"
    >
     <div className="border px-4 py-4 bg-red-600 text-white">LOGAR</div>
      Login com Google
    </button>
  );
}
