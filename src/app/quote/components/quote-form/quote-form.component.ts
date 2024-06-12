import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {QuoteService} from "../../services/quote.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IQuote, Quote} from "../../models/quote.model";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.scss'
})
export class QuoteFormComponent implements OnDestroy {
  quote: IQuote = new Quote();
  tiers: string[] = ['basic', 'premium', 'enterprise']
  changesSaved: boolean = false;
  newQuoteForm!: FormGroup
  error: string | null = null
  private subscriptions: Subscription[] = [];

  constructor(
    private quoteService: QuoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.newQuoteForm = new FormGroup<any>({
      quoteName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      tier: new FormControl('', Validators.required),
      extras: new FormArray([])
    })
  }

  addQuote() {
    this.quote.name = this.newQuoteForm.value.quoteName
    this.quote.tier = this.newQuoteForm.value.tier
    this.quote.extras = this.newQuoteForm.value.extras
    this.changesSaved = true
    this.subscriptions.push(
      this.quoteService.addQuote(this.quote).subscribe()
    )

    this.router.navigate(['../'], {relativeTo: this.route})
  }

  get extras(): FormArray {
    return this.newQuoteForm.get('extras') as FormArray
  }

  addExtra() {
    this.extras.push(new FormControl(''))
  }

  removeExtra(i: number) {
    this.extras.removeAt(i)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
