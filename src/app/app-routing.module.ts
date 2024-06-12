import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from "./error/error.component";

const routes: Routes = [
  {
    path:'', redirectTo: '/quotes', pathMatch: 'full'
  },
  {
    path:'quotes',
    loadChildren: () => import('./quote/quote.module').then(m => m.QuoteModule)
  },
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'**', component: ErrorComponent, data: {message: "Page not found"}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
