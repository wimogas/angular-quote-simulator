import {Component, ElementRef, ViewChild} from '@angular/core';
import {QuoteService} from "../../services/quote.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.scss'
})
export class QuoteFormComponent {
  @ViewChild('quoteName') quoteName!: ElementRef;

  constructor(
    private quoteService: QuoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  addQuote() {
    this.quoteService.addQuote(this.quoteName.nativeElement.value)
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
