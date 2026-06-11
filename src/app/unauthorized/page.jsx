"use client";

import Link from "next/link";
import { Lock, ArrowLeft, Home } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-4 max-w-lg text-center">
        <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10">
          <Lock className="h-12 w-12 text-red-400" />
        </div>

        <p className="mb-2 text-red-400 font-semibold tracking-widest">
          ERROR 401
        </p>

        <h1 className="mb-4 text-5xl font-extrabold md:text-6xl">
          Access Denied
        </h1>

        <p className="mb-8 text-lg text-gray-400">
          You don’t have permission to access this page.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signin"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-black"
          >
            <Home size={18} />
            Home
          </Link>

          <button
            onClick={() => history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}