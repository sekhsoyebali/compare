import { CryptoData } from '../types';

export const serum: CryptoData = {
  id: "serum",
  name: "Serum",
  description: "Serum is a decentralized exchange (DEX) and ecosystem that brings unprecedented speed and low transaction costs to decentralized finance.",
  website: "https://www.projectserum.com",
  token: "SRM",
  categories: ["DEX", "DeFi"],
  metrics: {
    tvl: 200000000,
    daily_active_users: 10000,
    total_transactions: 5000000,
    market_cap: 500000000,
    token_price: 1.2
  },
  historical_data: {
    tvl: [190000000, 195000000, 200000000],
    token_price: [1.15, 1.18, 1.2]
  }
};
