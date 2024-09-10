import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { allCryptos } from '@/app/blockchains';

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
  onRemove?: () => void;
  placeholder?: string;
  selectedCryptos: string[];
}

export function AutocompleteInput({ value, onChange, onSelect, onRemove, placeholder, selectedCryptos }: AutocompleteInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.length > 0) {
      const lowercaseValue = value.toLowerCase();
      const filteredSuggestions = Object.values(allCryptos)
        .filter(crypto => 
          (crypto.name.toLowerCase().includes(lowercaseValue) ||
          crypto.id.toLowerCase().includes(lowercaseValue)) &&
          !selectedCryptos.includes(crypto.name)
        )
        .sort((a, b) => {
          const aStartsWith = a.name.toLowerCase().startsWith(lowercaseValue);
          const bStartsWith = b.name.toLowerCase().startsWith(lowercaseValue);
          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
          return a.name.localeCompare(b.name);
        })
        .map(crypto => crypto.name)
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value, selectedCryptos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSelect(suggestion);
    setShowSuggestions(false);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-white rounded-full">
        <span className="text-gray-400 px-4">vs</span>
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="flex-grow bg-transparent text-black px-4 py-5 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-l-2 border-r-0 border-y-0 border-slate-300"
          placeholder={placeholder}
        />
        {onRemove && (
          <Button variant="ghost" className="p-3" onClick={onRemove}>
            <X className="w-5 h-5 text-gray-400" />
          </Button>
        )}
      </div>
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
  );
}