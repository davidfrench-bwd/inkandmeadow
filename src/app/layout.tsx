import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ink & Meadow — Cottagecore Coloring Club",
  description:
    "Find your calm with Ink & Meadow. A cottagecore-inspired coloring membership delivering hand-curated, beautifully illustrated pages to your inbox every month. Trade screen time for something beautiful.",
  keywords: [
    "coloring pages",
    "cottagecore",
    "adult coloring",
    "coloring membership",
    "relaxation",
    "mindfulness",
    "printable coloring",
  ],
  openGraph: {
    title: "Ink & Meadow — Cottagecore Coloring Club",
    description:
      "Join thousands finding calm through cottagecore coloring. New hand-curated pages delivered monthly.",
    type: "website",
    url: "https://inkandmeadow.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ink & Meadow — Cottagecore Coloring Club",
    description:
      "Join thousands finding calm through cottagecore coloring. New hand-curated pages delivered monthly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-cream text-bark font-body antialiased">
        {children}
      </body>
    </html>
  );
}
