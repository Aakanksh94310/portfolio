"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide on homepage
  if (pathname === "/") return null;

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 transition hover:bg-white/10"
      aria-label="Go back"
      type="button"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
}