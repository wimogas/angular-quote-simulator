import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import {QuoteComponent} from "./quote.component";
import {QuoteFormComponent} from "./components/quote-form/quote-form.component";
import {QuoteDetailComponent} from "./components/quote-detail/quote-detail.component";
import {AuthGuard} from "../auth/guards/auth.guard";
import {QuoteListComponent} from "./components/quote-list/quote-list.component";
import {QuoteListResolverService} from "./resolvers/quote-list-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: QuoteComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: QuoteListResolverService
    },
    children: [
      { path: '',
        component: QuoteListComponent,
      },
      { path: 'new',
        component: QuoteFormComponent,
      },
      { path: ':id',
        component: QuoteDetailComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRoutingModule { }
