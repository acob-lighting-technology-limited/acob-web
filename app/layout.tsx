import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/customShadow.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Providers } from "@/components/providers/session-provider";
import { Toaster, toast } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ACOB Lighting Technology Limited - Solar Energy Solutions",
  description:
    "Leading supplier of solar materials for manufacturers, installers & contractors. Mini-grid solutions, captive power systems, and professional energy audits.",
  keywords:
    "solar energy, mini-grid solutions, renewable energy, Nigeria, solar panels, energy audit",
  authors: [{ name: "ACOB Lighting Technology Limited" }],

  openGraph: {
    title: "ACOB Lighting Technology Limited",
    description: "Lighting Up Nigeria with Advanced Solar Solutions",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-background text-foreground selection:bg-primary selection:text-white`}
      >
        <Providers>
          <Toaster closeButton position="top-right" />
          <div className="flex min-h-screen flex-col w-full">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />

            <ScrollToTop />
          </div>
        </Providers>
      </body>
    </html>
  );
}
