import { CryptoData } from '../types';

export const astar: CryptoData = {
  id: "astar",
  name: "Astar",
  description: "Astar Network is a multi-chain decentralized application layer on Polkadot.",
  website: "https://astar.network",
  token: "ASTR",
  categories: ["Smart Contracts", "dApps"],
  metrics: {
    tvl: 150000000,
    daily_active_users: 8000,
    total_transactions: 2000000,
    market_cap: 300000000,
    token_price: 0.1
  },
  historical_data: {
    tvl: [140000000, 145000000, 150000000],
    token_price: [0.09, 0.095, 0.1]
  }
};
