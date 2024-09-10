import { CryptoData } from '../types';

export const acurast: CryptoData = {
  id: "acurast",
  name: "Acurast",
  description: "Acurast is a decentralized oracle and automation protocol on Kusama.",
  website: "https://acurast.com",
  token: "ACU",
  categories: ["Oracle", "Automation"],
  metrics: {
    tvl: 25000000,
    daily_active_users: 1500,
    total_transactions: 300000,
    market_cap: 50000000,
    token_price: 0.25
  },
  historical_data: {
    tvl: [23000000, 24000000, 25000000],
    token_price: [0.23, 0.24, 0.25]
  }
};
