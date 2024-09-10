import { CryptoData } from '../types';

export const basilisk: CryptoData = {
  id: "basilisk",
  name: "Basilisk",
  description: "Basilisk is a liquidity bootstrapping protocol built for Kusama.",
  website: "https://bsx.fi",
  token: "BSX",
  categories: ["DeFi", "Liquidity"],
  metrics: {
    tvl: 40000000,
    daily_active_users: 3500,
    total_transactions: 600000,
    market_cap: 80000000,
    token_price: 0.04
  },
  historical_data: {
    tvl: [38000000, 39000000, 40000000],
    token_price: [0.038, 0.039, 0.04]
  }
};
