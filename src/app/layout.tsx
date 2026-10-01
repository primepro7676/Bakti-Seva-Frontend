import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Noto_Sans_Devanagari, Noto_Sans_Kannada } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWidgets } from "@/components/layout/FloatingWidgets";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
});

const kannada = Noto_Sans_Kannada({
  variable: "--font-kannada",
  subsets: ["kannada"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Bakti Seva | Premium Indian Spiritual Lifestyle Brand",
    template: "%s | Bakti Seva",
  },
  description:
    "Discover thoughtfully curated spiritual essentials, sacred homas, authentic rudraksha, handcrafted idols, and meaningful gifting for everyday devotion.",
  keywords: [
    "Bakti Seva",
    "Hindu Puja",
    "Spiritual Lifestyle",
    "Puja Essentials",
    "Rudraksha Mala",
    "Online Seva",
    "Handcrafted Idols",
    "Sacred Gifting",
  ],
  authors: [{ name: "Bakti Seva" }],
  creator: "Bakti Seva",
  publisher: "Bakti Seva",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://baktiseva.com",
    title: "Bakti Seva | Premium Indian Spiritual Lifestyle Brand",
    description:
      "Thoughtfully curated spiritual essentials, sacred offerings, and meaningful traditions for everyday devotion.",
    siteName: "Bakti Seva",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bakti Seva | Premium Indian Spiritual Lifestyle Brand",
    description:
      "Thoughtfully curated spiritual essentials, sacred offerings, and meaningful traditions for everyday devotion.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${manrope.variable} ${devanagari.variable} ${kannada.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FFFDF7] text-[#342B27]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWidgets />
      </body>
    </html>
  );
}
