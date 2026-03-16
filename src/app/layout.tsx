import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BackButton from "@/components/BackButton";
import Chatbot from "@/components/Chatbot";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Aakanksh | Software Engineer & AI Researcher",
  description: "Building the next generation of software with AI and scalable architectures.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} bg-[#030712]`}>
      <body
        className={`
          ${inter.className}
          min-h-screen
          bg-[#030712]
          text-slate-50
          antialiased
          selection:bg-cyan-500/30
        `}
      >
        {/* Global Navigation Wrapper for Inner Pages */}
        <div className="relative z-[100] mx-auto max-w-7xl px-6 pt-6">
          <BackButton />
        </div>

        {children}

        {/* Global Chatbot */}
        <Chatbot />
      </body>
    </html>
  );
}