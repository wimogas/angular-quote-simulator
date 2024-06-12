import {Component, Input} from '@angular/core';
import {Quote} from "../../models/quote.model";

@Component({
  selector: 'app-quote-list-item',
  templateUrl: './quote-list-item.component.html',
  styleUrl: './quote-list-item.component.scss'
})
export class QuoteListItemComponent {
  @Input() quote!: Quote;
}
