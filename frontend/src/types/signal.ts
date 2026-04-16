export type SignalClassification = 'INFORMED_MOVE' | 'UNCERTAIN' | 'NOISE';

export interface Signal {
  id: string;
  marketId: string;
  marketTitle: string;
  score: number;
  classification: SignalClassification;
  priceDelta: string;
  liquidity: string;
  orders: number;
  volRatio: number;
  aiInsight?: string;
  timestamp: string;
  resolved?: boolean;
  outcome?: string;
}
