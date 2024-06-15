import {Component, OnDestroy} from '@angular/core';
import {QuoteService} from "../../services/quote.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IQuote, Quote} from "../../models/quote.model";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {generateQuote} from "../../../../mocks/mockQuoteGenerator";

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.scss'
})
export class QuoteFormComponent {
  quote: IQuote = new Quote();
  tiers: string[] = ['basic', 'premium', 'enterprise']
  changesSaved: boolean = false;
  newQuoteForm!: FormGroup
  error: string | null = null

  constructor(
    private quoteService: QuoteService,
    private router: Router
  ) {
    this.newQuoteForm = new FormGroup<any>({
      quoteName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      tier: new FormControl('', Validators.required),
      extras: new FormArray([]),
      company: new FormControl(''),
      totalPrice: new FormControl('')
    })
  }

  addQuote() {
    this.quote.name = this.newQuoteForm.value.quoteName
    this.quote.tier = this.newQuoteForm.value.tier
    this.quote.extras = this.newQuoteForm.value.extras
    this.quote.createdAt = new Date()
    this.quote.company = this.newQuoteForm.value.company
    this.quote.totalPrice = this.newQuoteForm.value.totalPrice

    this.changesSaved = true

    this.quoteService.addQuote(this.quote).subscribe({
      next: () => this.router.navigate(['/quotes']),
      error: err => console.log(err),
    })

  }

  get extras(): FormArray {
    return this.newQuoteForm.get('extras') as FormArray
  }

  addExtra(extra?: string) {
    this.extras.push(new FormControl(extra || ''))
  }

  removeExtra(i: number) {
    this.extras.removeAt(i)
  }

  generateFake() {
    const fakeQuote = generateQuote()
    console.log(fakeQuote)
    this.newQuoteForm.setValue({
      quoteName: fakeQuote.name,
      tier: fakeQuote.tier,
      company: fakeQuote.company,
      totalPrice: fakeQuote.totalPrice,
      extras: []
    })
    if (fakeQuote.extras) {
      fakeQuote.extras.forEach(extra => {
        this.addExtra(extra);
      });
    }
  }

}
