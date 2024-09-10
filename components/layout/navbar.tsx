"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";  // Add this import
import { Search } from "lucide-react";
import { useState } from "react";
import { allCryptos } from '@/app/blockchains';

export function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filteredSuggestions = Object.values(allCryptos)
        .filter(crypto => 
          crypto.name.toLowerCase().includes(value.toLowerCase()) ||
          crypto.id.toLowerCase().includes(value.toLowerCase())
        )
        .map(crypto => crypto.name)
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(""); // Clear the input
    setShowSuggestions(false);
    const formattedSuggestion = suggestion.toLowerCase().replace(/ /g, '-');
    router.push(`/${formattedSuggestion}`);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image
              className="invert"
              src="https://nextjs.org/icons/next.svg"
              alt="Next.js Logo"
              width={50}
              height={50}
              style={{ width: '50', height: '50' }}
            />
            <span className="ml-2 text-xl font-semibold">CryptoCompare</span>
          </Link>
          <div className="flex items-center">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search crypto..."
                className="pl-10 pr-4 py-2 rounded-full"
                value={searchTerm}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white text-left"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Button variant="ghost" className="ml-4">About</Button>
            <Button variant="ghost" className="ml-4">Contact</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
