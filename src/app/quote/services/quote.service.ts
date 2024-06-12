import { Injectable } from '@angular/core';
import {Product} from "../models/product.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";
import {Quote} from "../models/quote.model";
import {AuthService} from "../../auth/services/auth.service";
import {environment} from "../../../environments/environment";

interface QuoteResponse {
  [key: string]: Quote;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  quoteList: any[] = []

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getQuoteList() {
    return this.http.get<QuoteResponse>(`${environment.firebaseDbUrl}quotes.json`)
      .pipe(
        map(res => {
          console.log(res)
          let quotes: any[] = []
          Object.entries(res).map(([key, value]) => {
            quotes.push({
              id: key,
              ...value
            });
          })
          this.quoteList = quotes;
          return {
            error: false,
            data: quotes
          }
        }),
        catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  getQuoteById(id: string) {
    return this.quoteList.find(q => q.id === id)
  }

  addQuote(quote: string) {
    this.quoteList.push({
      id: (this.quoteList.length + 1).toString(),
      name: quote,
      tier: 'basic',
      extras: []
    })
  }

  updateQuote(id: string, quoteName: string) {
    this.quoteList.map((quote) => {
      if (quote.id === id) {
        quote.name = quoteName
      }
    })
  }

  calculateFinalPrice(product: Product): number {
    let basePrice: number;

    // Set base price based on tier
    switch (product.tier) {
      case 'basic':
        basePrice = 7000;
        break;
      case 'premium':
        basePrice = 12000;
        break;
      case 'enterprise':
        basePrice = 20000;
        break;
      default:
        basePrice = 0;
    }

    // Calculate price based on addons and skus
    let totalPrice = basePrice;
    totalPrice += product.addons.reduce((acc, curr) => acc + curr, 0 )
    totalPrice += product.skus * (product.skus > 10000 ? 0.1 : 0.5);

    // Apply any region-specific adjustments

    return totalPrice;
  }
}
