import { CryptoData } from '../types';

export const raydium: CryptoData = {
  id: "raydium",
  name: "Raydium",
  description: "Raydium is an automated market maker (AMM) built on the Solana blockchain.",
  website: "https://raydium.io",
  token: "RAY",
  categories: ["DeFi", "AMM"],
  metrics: {
    tvl: 250000000,
    daily_active_users: 15000,
    total_transactions: 7000000,
    market_cap: 500000000,
    token_price: 0.7
  },
  historical_data: {
    tvl: [240000000, 245000000, 250000000],
    token_price: [0.65, 0.68, 0.7]
  }
};
