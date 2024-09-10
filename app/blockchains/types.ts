export interface CryptoData {
  id: string;
  name: string;
  description: string;
  website: string;
  token: string;
  categories: string[];
  metrics: {
    tvl: number;
    daily_active_users: number;
    total_transactions: number;
    market_cap: number;
    token_price: number;
  };
  historical_data: {
    tvl: number[];
    token_price: number[];
  };
}