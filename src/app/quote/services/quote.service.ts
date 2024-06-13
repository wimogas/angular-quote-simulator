import { Injectable } from '@angular/core';
import {Product} from "../models/product.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Subject, tap, throwError} from "rxjs";
import {IQuote, Quote} from "../models/quote.model";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/services/auth.service";

interface QuoteResponse {
  [key: string]: IQuote;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  quoteListSub = new BehaviorSubject<IQuote[]>([])
  filteredQuoteList = new BehaviorSubject<IQuote[]>([])
  page = 1;
  limit = 10;
  totalCount = 0;
  userId = ''

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.userId = this.authService.user.value!.id
  }

  getQuoteList() {
    return this.http.get<QuoteResponse>(`${environment.firebaseDbUrl}${this.userId}/quotes.json`).pipe(
      map(data => {
          let quotes: IQuote[] = []
          Object.entries(data).map(([key, value]) => {
            quotes.push({
              id: key,
              ...value
            });
          })
          this.quoteListSub.next(quotes)
          this.totalCount = this.quoteListSub.value.length
          this.filteredQuoteList.next(this.quoteListSub.value.slice(this.page-1, (this.limit*this.page)))
      }),
      catchError(this.handleError)
    )
  }

  getFilteredQuoteListSubject() {
    return this.filteredQuoteList.asObservable();
  }

  getQuoteById(id: string) {
    return this.quoteListSub.value.find(q => q.id === id)
  }

  addQuote(quote: IQuote) {
    quote.userId = this.authService.user.value!.id
    return this.http.post<any>(
      `${environment.firebaseDbUrl}${this.userId}/quotes.json`, quote).pipe(
        catchError(this.handleError),
      tap((data) => {
        const newQuote = {
          id: data.name,
          ...quote
        }
        const updatedQuoteList = [...this.quoteListSub.value, newQuote]
        this.quoteListSub.next(updatedQuoteList)
        return this.router.navigate(['/quotes'])
      })
    )
  }

  deleteQuote(id: string) {
    return this.http.delete<void>(`
    ${environment.firebaseDbUrl}${this.userId}/quotes/${id}.json`).pipe(
      catchError(this.handleError),
      tap(() => {
        const updatedQuoteList = this.quoteListSub.value.filter(q => q.id !== id);
        this.quoteListSub.next(updatedQuoteList);
        this.totalCount = this.quoteListSub.value.length
        this.filteredQuoteList.next(this.quoteListSub.value.slice(this.page-1, (this.limit*this.page)))
      })
    )
  }

  updateQuote(quote: IQuote) {
    const updatedQuote = {
      name: quote.name,
      tier: quote.tier,
      extras: quote.extras
    }
    return this.http.put<void>(`${environment.firebaseDbUrl}${this.userId}/quotes/${quote.id}.json`, updatedQuote).pipe(
      tap((data) => {
        const updatedQuotes = this.quoteListSub.value.map((q) => (q.id === quote.id) ? quote : q)
        this.quoteListSub.next(updatedQuotes)
        return this.router.navigate(['/quotes'])
      })
    );
  }

  pageUp() {
    this.page += this.limit
    this.filteredQuoteList.next(this.quoteListSub.value.slice(this.page-1, (this.limit*this.page)))

  }

  pageDown() {
    this.page -= this.limit
    this.filteredQuoteList.next(this.quoteListSub.value.slice(this.page-1, (this.limit*this.page)))

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

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
