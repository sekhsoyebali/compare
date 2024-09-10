import type { Metadata } from "next";
import "./globals.css";
import { fontSans, geistSans, geistMono } from "@/app/assets/fonts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HydrationFix } from "./HydrationFix";

export const metadata: Metadata = {
  title: "CryptoCompare",
  description: "Compare cryptocurrencies across different blockchains",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HydrationFix />
      </head>
      <body className={`antialiased bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen flex flex-col dark ${fontSans.variable} ${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <div className="flex-grow flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
