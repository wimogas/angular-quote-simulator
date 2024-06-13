export interface IQuote {
  id?: string,
  userId?: string,
  name: string,
  tier: 'basic' | 'premium' |'enterprise',
  extras?: string[],
  createdAt?: Date,
  company?: string,
  totalPrice?: number,
}

export class Quote {
  constructor(
    public name: string = '',
    public tier: 'basic' | 'premium' |'enterprise' = 'basic',
    public extras: string[] = [],
    public createdAt: Date = new Date(),
    public company?: string,
    public totalPrice?: number,
  ) {
  }
}
