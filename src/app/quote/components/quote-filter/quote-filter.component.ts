import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {QuoteService} from "../../services/quote.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-quote-filter-form',
  templateUrl: './quote-filter.component.html',
  styleUrls: ['./quote-filter.component.scss']
})
export class QuoteFilterFormComponent implements OnInit, OnDestroy {
  quoteFilterForm: FormGroup = new FormGroup({});
  subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private quoteService: QuoteService,
  ) {}

  ngOnInit(): void {
    this.quoteFilterForm = this.fb.group({
      name: ['', Validators.required],
      tier: ['', Validators.required],
      company: [''],
    });
  }

  onSubmit(): void {
    this.subscription = this.quoteService.filterQuotes(this.quoteFilterForm.value).subscribe()
  }

  resetForm() {
    this.quoteFilterForm = this.fb.group({
      name: ['', Validators.required],
      tier: ['', Validators.required],
      company: [''],
    });
    this.subscription = this.quoteService.filterQuotes(this.quoteFilterForm.value).subscribe()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
