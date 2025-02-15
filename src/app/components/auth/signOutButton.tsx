"use client";

import {  signOut } from "next-auth/react";

export function SignOutnBtn() {
  return (
    <button
      onClick={() => signOut( { callbackUrl: "/" })}
      className="flex gap-2 items-center border border-neutral-900 p-2 rounded-md"
    >
     <div className="border px-4 py-4 bg-red-600 text-white">SAIR</div>
      Sair com Google
    </button>
  );
}
