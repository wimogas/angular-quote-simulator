import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quote-filter-form',
  templateUrl: './quote-filter.component.html',
  styleUrls: ['./quote-filter.component.scss']
})
export class QuoteFilterFormComponent implements OnInit {
  quoteFilterForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.quoteFilterForm = this.fb.group({
      name: ['', Validators.required],
      tier: ['', Validators.required],
      company: [''],
    });
  }

  onSubmit(): void {
    console.log('Form Value:', this.quoteFilterForm.value);
  }
}
