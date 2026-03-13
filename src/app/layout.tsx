import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

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
        {META_PIXEL_ID && (
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
        {META_PIXEL_ID && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
      </body>
    </html>
  );
}
