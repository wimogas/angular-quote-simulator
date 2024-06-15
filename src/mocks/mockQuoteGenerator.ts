import { faker } from '@faker-js/faker';
import {IQuote} from "../app/quote/models/quote.model";

type Tier = 'basic' | 'premium' | 'enterprise'

export const generateQuote = (): IQuote => {
  const tiers : Tier[] = ['basic', 'premium', 'enterprise'];

  return {
    userId: '5yFPOwOlP5W3qIviqthlTMWEr772',
    name: faker.company.name(),
    tier: tiers[Math.floor(Math.random() * 3)],
    extras: faker.helpers.uniqueArray(faker.commerce.productMaterial, faker.datatype.number({ min: 0, max: 5 })),
    createdAt: faker.date.past(),
    company: faker.company.name(),
    totalPrice: +faker.commerce.price(100, 10000, 2)
  };
};
