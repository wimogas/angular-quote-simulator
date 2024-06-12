export interface IQuote {
  id?: string,
  name: string,
  tier: 'basic' | 'premium' |'enterprise',
  extras?: string[],
  company?: string,
  productId?: string,
  totalPrice?: number
}

export class Quote {
  constructor(
    public name: string = '',
    public tier: 'basic' | 'premium' |'enterprise' = 'basic',
    public extras: string[] = [],
    public company?: string,
    public productId?: string,
    public totalPrice?: number,
  ) {
  }
}
