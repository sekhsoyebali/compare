import { CryptoData } from '../types';

export const bajuna: CryptoData = {
  id: "bajuna",
  name: "Bajuna",
  description: "Bajuna is the Kusama deployment of the Ajuna Network, focusing on blockchain gaming.",
  website: "https://ajuna.io",
  token: "BAJU",
  categories: ["Gaming", "NFT"],
  metrics: {
    tvl: 15000000,
    daily_active_users: 2000,
    total_transactions: 400000,
    market_cap: 30000000,
    token_price: 0.15
  },
  historical_data: {
    tvl: [14000000, 14500000, 15000000],
    token_price: [0.14, 0.145, 0.15]
  }
};
