export interface Product {
  region: string;
  tier: 'basic' | 'premium' | 'enterprise';
  skus: number;
  addons: number[];
}
