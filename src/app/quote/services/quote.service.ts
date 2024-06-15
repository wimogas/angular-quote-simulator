import { Injectable } from '@angular/core';
import {Product} from "../models/product.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, filter, map, Subject, tap, throwError} from "rxjs";
import {IQuote, Quote} from "../models/quote.model";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/services/auth.service";

interface QuoteResponse {
  [key: string]: IQuote;
}

export type Obj = {
  [key: string]: string
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  quoteListSub = new BehaviorSubject<IQuote[]>([])
  filteredQuoteListSub = new BehaviorSubject<IQuote[]>([])
  readonly filteredQuoteList = this.filteredQuoteListSub.asObservable()

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

  fetchQuoteList() {
    return this.http.get<QuoteResponse>(`${environment.firebaseDbUrl}${this.userId}/quotes.json`).pipe(
      tap(data => {
        if (data) {
          let quotes: IQuote[] = []
          Object.entries(data).map(([key, value]) => {
            quotes.push({
              id: key,
              ...value
            });
          })
          this.quoteListSub.next(quotes)
          this.totalCount = this.quoteListSub.value.length
          this.filteredQuoteListSub.next(this.quoteListSub.value.slice(this.page-1, (this.limit*this.page)))

        }
      }),
      catchError(this.handleError)
    )
  }

  getFilteredQuoteList() {
    return this.filteredQuoteList
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
          this.filteredQuoteListSub.next(this.quoteListSub.value.slice(this.page-1, (this.limit*this.page)))
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
        this.filteredQuoteListSub.next(this.quoteListSub.value.slice(this.page-1, (this.limit*this.page)))
      })
    )
  }

  updateQuote(quote: IQuote) {
    const updatedQuote = {
      name: quote.name,
      tier: quote.tier,
      extras: quote.extras
    }
    return this.http.put<void>(
      `${environment.firebaseDbUrl}${this.userId}/quotes/${quote.id}.json`, updatedQuote).pipe(
      tap((data) => {
        const updatedQuotes = this.quoteListSub.value.map((q) => (q.id === quote.id) ? quote : q)
        this.quoteListSub.next(updatedQuotes)
      })
    );
  }

  filterQuotes(filters: Obj) {
    return this.quoteListSub.pipe(
      tap(quotes => {
        const filteredQuotes = quotes.filter(quote =>
          Object.keys(filters).every(key =>
            filters[key] === '' || quote[key as keyof IQuote]?.toString().toLowerCase().includes(filters[key].toLowerCase())
          )
        )
        this.totalCount = filteredQuotes.length
        this.page = 1
        this.filteredQuoteListSub.next(filteredQuotes.slice(this.page-1, (this.limit*this.page)))

      })
    )
  }

  pageUp() {
    this.page += this.limit
    this.filteredQuoteListSub.next(this.quoteListSub.value.slice(this.page-1, (this.limit*this.page)))

  }

  pageDown() {
    this.page -= this.limit
    this.filteredQuoteListSub.next(this.quoteListSub.value.slice(this.page-1, (this.limit*this.page)))

  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
