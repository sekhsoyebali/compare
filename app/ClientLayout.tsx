"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <body
      className={cn(
        "antialiased bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen flex flex-col",
        isHydrated && "hydrated"
      )}
    >
      <Navbar />
      <div className="flex-grow flex flex-col">{children}</div>
      <Footer />
    </body>
  );
}