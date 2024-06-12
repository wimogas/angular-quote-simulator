export interface Quote {
  id?: string,
  name: string,
  tier: 'basic' | 'premium' |'enterprise',
  extras?: string[],
  company?: string,
  productId?: string,
  totalPrice?: number
}
