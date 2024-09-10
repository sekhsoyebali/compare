import { CryptoData } from '../types';

export const karura: CryptoData = {
  id: "karura",
  name: "Karura",
  description: "Karura is the all-in-one DeFi hub of Kusama.",
  website: "https://karura.network",
  token: "KAR",
  categories: ["DeFi", "DEX"],
  metrics: {
    tvl: 50000000,
    daily_active_users: 3000,
    total_transactions: 500000,
    market_cap: 100000000,
    token_price: 0.8
  },
  historical_data: {
    tvl: [48000000, 49000000, 50000000],
    token_price: [0.75, 0.78, 0.8]
  }
};