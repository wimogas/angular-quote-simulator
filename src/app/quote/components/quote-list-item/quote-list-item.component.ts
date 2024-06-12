import {Component, Input, OnDestroy} from '@angular/core';
import {IQuote} from "../../models/quote.model";
import {QuoteService} from "../../services/quote.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-quote-list-item',
  templateUrl: './quote-list-item.component.html',
  styleUrl: './quote-list-item.component.scss'
})
export class QuoteListItemComponent implements OnDestroy{
  @Input() quote!: IQuote;
  private subscriptions: Subscription[] = [];

  constructor(
    private quoteService: QuoteService,
  ) {
  }

  deleteQuote() {
    this.subscriptions.push(
      this.quoteService.deleteQuote(this.quote!.id!).subscribe()
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
