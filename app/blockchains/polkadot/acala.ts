import { CryptoData } from '../types';

export const acala: CryptoData = {
  id: "acala",
  name: "Acala",
  description: "Acala is a decentralized finance network powering the aUSD ecosystem.",
  website: "https://acala.network",
  token: "ACA",
  categories: ["DeFi", "Stablecoin"],
  metrics: {
    tvl: 100000000,
    daily_active_users: 5000,
    total_transactions: 1000000,
    market_cap: 200000000,
    token_price: 0.5
  },
  historical_data: {
    tvl: [95000000, 98000000, 100000000],
    token_price: [0.48, 0.49, 0.5]
  }
};