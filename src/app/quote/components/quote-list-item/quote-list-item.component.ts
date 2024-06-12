import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {IQuote} from "../../models/quote.model";

@Component({
  selector: 'app-quote-list-item',
  templateUrl: './quote-list-item.component.html',
  styleUrl: './quote-list-item.component.scss'
})
export class QuoteListItemComponent {
  @Input() quote!: IQuote;
  @Output() modalLaunched = new EventEmitter();

  constructor() {}

  showModal() {
    this.modalLaunched.emit(this.quote!.id!)
  }
}
