import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteListItemComponent } from './quote-list-item.component';

describe('QuoteListItemComponent', () => {
  let component: QuoteListItemComponent;
  let fixture: ComponentFixture<QuoteListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
