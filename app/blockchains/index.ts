import * as polkadot from './polkadot';
import * as kusama from './kusama';
import * as solana from './solana';
import { CryptoData } from './types';

const allCryptos: { [key: string]: CryptoData } = {
  ...polkadot,
  ...kusama,
  ...solana,
};

export { polkadot, kusama, solana, allCryptos };
export type { CryptoData };