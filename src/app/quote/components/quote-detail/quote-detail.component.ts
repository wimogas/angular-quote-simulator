import {Component, OnInit} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from "@angular/router";
import {QuoteService} from "../../services/quote.service";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Quote} from "../../models/quote.model";

@Component({
  selector: 'app-quote-detail',
  templateUrl: './quote-detail.component.html',
  styleUrl: './quote-detail.component.scss'
})
export class QuoteDetailComponent implements OnInit {
  quote?: Quote;
  tiers: string[] = ['basic', 'premium', 'enterprise']
  changesSaved: boolean = false;
  quoteForm!: FormGroup
  isModalVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quoteService: QuoteService) {
    this.quoteForm = new FormGroup<any>({
      quoteName: new FormControl('', [Validators.required, Validators.minLength(3), this.forbiddenNameValidator(/bob/i)]),
      tier: new FormControl('', Validators.required),
      extras: new FormArray([])
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const foundQuote = this.quoteService.getQuoteById(data['id'])
      console.log(foundQuote)
      if (foundQuote) {
        this.quote = foundQuote
        this.quoteForm.get('quoteName')?.setValue(foundQuote.name)
        this.quoteForm.get('tier')?.setValue(foundQuote.tier)
      } else {
        this.router.navigate(['/quotes'])
      }
    })
  }

  updateQuote() {
    if (this.quote) {
      this.changesSaved = true
      this.quote.name = this.quoteForm.value.quoteName
      this.quote.tier = this.quoteForm.value.tier
      this.quoteService.updateQuote(this.quote.id!, this.quote.name)
    }
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  get extras(): FormArray {
    return this.quoteForm.get('extras') as FormArray
  }

  addExtra() {
    this.extras.push(new FormControl(''))
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    };
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

}
