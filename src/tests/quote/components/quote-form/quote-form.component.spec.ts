import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteFormComponent } from '../../../../app/quote/components/quote-form/quote-form.component';

describe('QuoteFormComponent', () => {
  let component: QuoteFormComponent;
  let fixture: ComponentFixture<QuoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
