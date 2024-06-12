import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteListItemComponent } from './quote-list-item.component';
import {QuoteRoutingModule} from "../../quote-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {ActivatedRoute} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

describe('QuoteListItemComponent', () => {
  let component: QuoteListItemComponent;
  let fixture: ComponentFixture<QuoteListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuoteListItemComponent],
      imports: [
        QuoteRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteListItemComponent);
    component = fixture.componentInstance;

    component.quote = {
      id: '0',
      name: 'Quote 1',
      tier: 'basic'
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
