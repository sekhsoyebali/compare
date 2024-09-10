import { CryptoData } from '../types';

export const ajuna: CryptoData = {
  id: "ajuna",
  name: "Ajuna",
  description: "Ajuna Network is a blockchain gaming platform built on Substrate.",
  website: "https://ajuna.io",
  token: "AJUN",
  categories: ["Gaming", "NFT"],
  metrics: {
    tvl: 30000000,
    daily_active_users: 4000,
    total_transactions: 800000,
    market_cap: 60000000,
    token_price: 0.3
  },
  historical_data: {
    tvl: [28000000, 29000000, 30000000],
    token_price: [0.28, 0.29, 0.3]
  }
};