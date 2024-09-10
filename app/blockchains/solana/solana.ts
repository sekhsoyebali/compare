import { CryptoData } from '../types';

export const solana: CryptoData = {
  id: "solana",
  name: "Solana",
  description: "Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale.",
  website: "https://solana.com",
  token: "SOL",
  categories: ["Layer 1", "Smart Contracts"],
  metrics: {
    tvl: 2000000000,
    daily_active_users: 100000,
    total_transactions: 100000000,
    market_cap: 10000000000,
    token_price: 25
  },
  historical_data: {
    tvl: [1900000000, 1950000000, 2000000000],
    token_price: [23, 24, 25]
  }
};
