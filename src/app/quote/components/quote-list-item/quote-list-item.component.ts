import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IQuote} from "../../models/quote.model";

@Component({
  selector: 'app-quote-list-item',
  templateUrl: './quote-list-item.component.html',
  styleUrl: './quote-list-item.component.scss'
})
export class QuoteListItemComponent {
  @Input() quote!: IQuote;
  @Output() quoteSelected = new EventEmitter();

  constructor() {}

  selectQuote() {
    this.quoteSelected.emit(this.quote!)
  }
}
