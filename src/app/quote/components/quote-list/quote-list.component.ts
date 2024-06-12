import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuoteService} from "../../services/quote.service";
import {IQuote} from "../../models/quote.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.scss'
})
export class QuoteListComponent implements OnInit, OnDestroy {
  quoteList : IQuote[] = []
  quoteFilter: string = '';
  isLoading: boolean = false;
  error: string | null = null
  private subscriptions: Subscription[] = [];

  constructor(
    private quoteService: QuoteService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.quoteService.getQuoteListSubject().subscribe(data => {
          this.quoteList = data
        }
      )
    )

    this.quoteService.getQuoteList().subscribe()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
