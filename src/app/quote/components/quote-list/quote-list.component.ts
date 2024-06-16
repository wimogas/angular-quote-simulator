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
  page = 1;
  lastPage = -1;
  limit = 10;
  selectedQuotes: IQuote[] = []
  isLoading: boolean = false;
  error: string | null = null
  isModalVisible: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private quoteService: QuoteService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.quoteService.getPaginatedQuoteList().subscribe(data => {
          this.quoteList = data
          this.lastPage = this.quoteService.totalCount
          this.page = this.quoteService.page
          this.limit = this.quoteService.limit
        }
      )
    )
  }

  closeModal() {
    this.isModalVisible = false
  }

  showModal() {
    this.isModalVisible = true
  }

  onQuoteSelected(quote: IQuote) {
    const foundIndex = this.selectedQuotes.indexOf(quote)
    if (foundIndex >= 0) {
      this.selectedQuotes = this.selectedQuotes.filter((q,i) => i !== foundIndex)
    } else {
      this.selectedQuotes.push(quote)
    }
  }

  deleteQuote() {
    this.selectedQuotes.forEach(quote => {
       this.quoteService.deleteQuote(quote!.id!).subscribe({
         error: (err) => console.log(err)
       })
    })

    this.isModalVisible = false;
  }

  paginateUp() {
    this.page += 2
    this.quoteService.pageUp()
  }

  paginateDown() {
    this.page -= 2
    this.quoteService.pageDown()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
