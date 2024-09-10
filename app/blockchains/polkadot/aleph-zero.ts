import { CryptoData } from '../types';

export const aleph: CryptoData = {
  id: "aleph-zero",
  name: "Aleph Zero",
  description: "Aleph Zero is a privacy-enhancing, high-performance blockchain with instant finality.",
  website: "https://alephzero.org",
  token: "AZERO",
  categories: ["Privacy", "Smart Contracts"],
  metrics: {
    tvl: 80000000,
    daily_active_users: 6000,
    total_transactions: 1500000,
    market_cap: 160000000,
    token_price: 0.8
  },
  historical_data: {
    tvl: [75000000, 77500000, 80000000],
    token_price: [0.75, 0.775, 0.8]
  }
};
