'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon, HelpCircleIcon, ShareIcon, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { allCryptos, CryptoData } from '@/app/blockchains';
import { cn } from "@/lib/utils";

type ComparisonItem = CryptoData & {
  color: string
}

const chartColors = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function ComparisonSection({ initialComparisons }: { initialComparisons: ComparisonItem[] }) {
  const [comparisons, setComparisons] = useState(initialComparisons);
  const [isAdding, setIsAdding] = useState(false);
  const [newCrypto, setNewCrypto] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newCrypto.length > 0) {
      const filteredSuggestions = Object.values(allCryptos)
        .filter(crypto => 
          (crypto.name.toLowerCase().includes(newCrypto.toLowerCase()) ||
          crypto.id.toLowerCase().includes(newCrypto.toLowerCase())) &&
          !comparisons.some(c => c.id === crypto.id)
        )
        .map(crypto => crypto.name)
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [newCrypto, comparisons]);

  const addComparison = () => {
    if (comparisons.length < 4) {
      setIsAdding(true);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleNewCryptoChange = (value: string) => {
    setNewCrypto(value);
  };

  const handleNewCryptoSubmit = (cryptoName: string = newCrypto) => {
    const crypto = Object.values(allCryptos).find(
      c => c.name.toLowerCase() === cryptoName.toLowerCase() || c.id.toLowerCase() === cryptoName.toLowerCase()
    );
    if (crypto && !comparisons.some(c => c.id === crypto.id)) {
      const newComparison = {
        ...crypto,
        color: chartColors[comparisons.length % chartColors.length]
      };
      const newComparisons = [...comparisons, newComparison];
      const sortedComparisons = newComparisons.sort((a, b) => a.name.localeCompare(b.name));
      setComparisons(sortedComparisons);
      setNewCrypto("");
      setIsAdding(false);
      updateUrl(sortedComparisons);
    }
  };

  const updateUrl = (newComparisons: ComparisonItem[]) => {
    const newUrl = `/${newComparisons.map(c => c.id).join('-vs-')}`;
    router.push(newUrl);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNewCryptoSubmit();
    }
  };

  const removeComparison = (id: string) => {
    const newComparisons = comparisons.filter(c => c.id !== id);
    setComparisons(newComparisons);
    updateUrl(newComparisons);
  };

  const handleInputBlur = () => {
    // If newCrypto is empty, revert to showing the "Add comparison" button
    if (!newCrypto.trim()) {
      setIsAdding(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {comparisons.map((item, index) => (
          <Card key={item.id} className="flex-1 min-w-[200px] bg-gray-800 border-gray-700 flex items-center text-white relative">
            <CardContent className="p-4 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors[index % chartColors.length] }} />
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => removeComparison(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-1">{item.token}</p>
            </CardContent>
          </Card>
        ))}
        {isAdding ? (
          <Card className="flex-1 min-w-[200px] bg-gray-800 border-gray-700 border-dashed flex items-center text-white">
            <CardContent className="p-4 w-full">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={newCrypto}
                  onChange={(e) => handleNewCryptoChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleInputBlur}
                  className="w-full bg-transparent text-white focus:outline-none"
                  placeholder="Type crypto name"
                />
                {newCrypto && (
                  <button
                    onClick={() => setNewCrypto('')}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                {suggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-gray-700 border border-gray-600 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-600 cursor-pointer text-white text-left"
                        onClick={() => handleNewCryptoSubmit(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        ) : comparisons.length < 4 && (
          <Card 
            className="flex-1 min-w-[200px] bg-gray-800 border-gray-700 border-dashed hover:bg-gray-700 transition-colors cursor-pointer"
            onClick={addComparison}
          >
            <CardContent className="p-4 h-full flex items-center justify-center">
              <div className="flex flex-col items-center">
                <PlusIcon className="h-6 w-6 text-gray-400" />
                <span className="text-gray-400">
                  Add comparison
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          {/* Comparison content */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold text-white">
                {comparisons.map(c => c.name).join(' vs ')} Comparison
              </h2>
              <HelpCircleIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Button variant="ghost" size="icon" className="text-slate-50 hover:text-slate-50 hover:bg-slate-700">
              <ShareIcon className="h-5 w-5" />
            </Button>
          </div>
          {comparisons.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left *:text-white">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-2 px-4 font-semibold"></th>
                    {comparisons.map((item, index) => (
                      <th key={index} className="py-2 px-4 font-semibold">
                        <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: chartColors[index % chartColors.length] }}></span>
                        {item.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-4 text-gray-400">Token</td>
                    {comparisons.map((item, index) => (
                      <td key={index} className="py-2 px-4">{item.token}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-4 text-gray-400">Categories</td>
                    {comparisons.map((item, index) => (
                      <td key={index} className="py-2 px-4">{item.categories.join(', ')}</td>
                    ))}
                  </tr>
                  {Object.keys(comparisons[0].metrics).map(metric => (
                    <tr key={metric} className="border-b border-gray-700">
                      <td className="py-2 px-4 text-gray-400">{metric.replace(/_/g, ' ')}</td>
                      {comparisons.map((item, index) => (
                        <td key={index} className="py-2 px-4">
                          {item.metrics[metric as keyof typeof item.metrics].toLocaleString()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}