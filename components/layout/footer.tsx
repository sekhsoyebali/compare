"use client"

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Twitter, Facebook, Instagram, Github } from 'lucide-react';
import { useSelectedLayoutSegment } from "next/navigation";

const comparisons = {
  title: "Popular Comparisons",
  links: [
    {
      title: "Polkadot vs Kusama",
      href: "/polkadot-vs-kusama",
    },
    {
      title: "Kusama vs Solana",
      href: "/kusama-vs-solana",
    },
    {
      title: "Polkadot vs Solana",
      href: "/polkadot-vs-solana",
    },
    {
      title: "Acala vs Karura",
      href: "/acala-vs-karura",
    },
  ],
};

const resources = {
  title: "Resources",
  links: [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "FAQ",
      href: "/faq",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
};

const legal = {
  title: "Legal",
  links: [
    {
      title: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      title: "Terms of Service",
      href: "/terms",
    },
    {
      title: "Disclaimer",
      href: "/disclaimer",
    },
  ],
};

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  const segment = useSelectedLayoutSegment();

  return (
    <footer className={cn(className, "border-t border-gray-200 bg-gray-900 py-8 text-gray-300 mt-20")}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">CryptoCompare</h2>
            <p className="mb-4 text-sm">
              Compare cryptocurrencies across different blockchains with ease.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Facebook, Instagram, Github].map((Icon, index) => (
                <a key={index} href="#" className="text-gray-400 hover:text-white">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {[comparisons, resources, legal].map((section, index) => (
            <div key={index}>
              <h2 className="mb-4 text-lg font-semibold text-white">{section.title}</h2>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm transition-colors hover:text-white",
                        link.href.startsWith(`/${segment}`) ? "text-white" : "text-gray-400"
                      )}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} CryptoCompare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
