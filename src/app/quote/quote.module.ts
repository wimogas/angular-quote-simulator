import { NgModule } from '@angular/core';

import { QuoteRoutingModule } from './quote-routing.module';
import {FilterPipe} from "./pipes/filter.pipe";
import {QuoteComponent} from "./quote.component";
import {QuoteListComponent} from "./components/quote-list/quote-list.component";
import {QuoteFormComponent} from "./components/quote-form/quote-form.component";
import {QuoteListItemComponent} from "./components/quote-list-item/quote-list-item.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SelectedQuoteDirective} from "./directives/selected-quote.directive";
import {QuoteDetailComponent} from "./components/quote-detail/quote-detail.component";
import {SharedModule} from "../shared/shared.module";
import {QuoteFilterFormComponent} from "./components/quote-filter/quote-filter.component";

@NgModule({
  declarations: [
    QuoteComponent,
    QuoteListComponent,
    QuoteListItemComponent,
    QuoteFormComponent,
    QuoteDetailComponent,
    QuoteFilterFormComponent,
    SelectedQuoteDirective,
    FilterPipe,
  ],
  imports: [
    QuoteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class QuoteModule { }
