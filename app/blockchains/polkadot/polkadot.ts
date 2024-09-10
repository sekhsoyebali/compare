import { CryptoData } from '../types';

export const polkadot: CryptoData = {
  id: "polkadot",
  name: "Polkadot",
  description: "Polkadot is a multi-chain network that allows for interoperability between different blockchains.",
  website: "https://polkadot.network",
  token: "DOT",
  categories: ["Layer 0", "Interoperability"],
  metrics: {
    tvl: 5000000000,
    daily_active_users: 50000,
    total_transactions: 50000000,
    market_cap: 8000000000,
    token_price: 7.5
  },
  historical_data: {
    tvl: [4800000000, 4900000000, 5000000000],
    token_price: [7.2, 7.35, 7.5]
  }
};
