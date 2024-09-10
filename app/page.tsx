"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AutocompleteInput } from "@/components/AutocompleteInput";
import { allCryptos } from '@/app/blockchains';

export default function Home() {
  const [inputs, setInputs] = useState([""]);
  const router = useRouter();

  const addInput = () => {
    if (inputs.length < 4) {
      setInputs(prevInputs => [...prevInputs, ""]);
    }
  };

  const removeInput = (index: number) => {
    setInputs(prevInputs => prevInputs.filter((_, i) => i !== index));
  };

  const handleInputChange = (index: number, value: string) => {
    setInputs(prevInputs => {
      const newInputs = [...prevInputs];
      newInputs[index] = value;
      return newInputs;
    });
  };

  const handleSuggestionSelect = (index: number, value: string) => {
    handleInputChange(index, value);
    if (index === inputs.length - 1 && inputs.length < 4) {
      addInput();
    }
  };

  const handleCompare = () => {
    const validInputs = inputs
      .filter(input => input.trim() !== '')
      .map(input => {
        const matchedCrypto = Object.values(allCryptos).find(
          crypto => crypto.name.toLowerCase() === input.toLowerCase() ||
                    crypto.id.toLowerCase() === input.toLowerCase()
        );
        return matchedCrypto ? matchedCrypto.id : null;
      })
      .filter(Boolean);

    if (validInputs.length > 0) {
      const sortedInputs = validInputs.sort();
      const comparisonLink = `/${sortedInputs.join('-vs-')}`;
      router.push(comparisonLink);
    }
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="text-6xl md:text-8xl font-bold mb-4">
        compare <span className="text-blue-400">crypto</span>
      </h1>
      <p className="text-xl md:text-2xl mb-12">
        Polkadot, Kusama, Solana, and more blockchains
      </p>
      <div className="w-full max-w-2xl space-y-4">
        {inputs.map((input, index) => (
          <AutocompleteInput
            key={index}
            value={input}
            onChange={(value) => handleInputChange(index, value)}
            onSelect={(value) => handleSuggestionSelect(index, value)}
            onRemove={index > 0 ? () => removeInput(index) : undefined}
            placeholder="Type crypto name to compare"
            selectedCryptos={inputs.filter(Boolean)}
          />
        ))}
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full"
          onClick={handleCompare}
        >
          Compare
        </Button>
      </div>
    </main>
  );
}
