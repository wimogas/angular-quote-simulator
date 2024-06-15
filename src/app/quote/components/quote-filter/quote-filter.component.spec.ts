import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteFilterComponent } from './quote-filter.component';

describe('QuoteFilterComponent', () => {
  let component: QuoteFilterComponent;
  let fixture: ComponentFixture<QuoteFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
