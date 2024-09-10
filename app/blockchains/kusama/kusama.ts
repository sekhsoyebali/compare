import { CryptoData } from '../types';

export const kusama: CryptoData = {
  id: "kusama",
  name: "Kusama",
  description: "Kusama is a scalable network of specialized blockchains built using Substrate and nearly the same codebase as Polkadot.",
  website: "https://kusama.network",
  token: "KSM",
  categories: ["Layer 0", "Canary Network"],
  metrics: {
    tvl: 1000000000,
    daily_active_users: 20000,
    total_transactions: 30000000,
    market_cap: 500000000,
    token_price: 30
  },
  historical_data: {
    tvl: [950000000, 975000000, 1000000000],
    token_price: [28, 29, 30]
  }
};
