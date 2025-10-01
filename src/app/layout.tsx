import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aakanksh | Ready to code",
  description: "Portfolio – Academics, Projects, Blog",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
