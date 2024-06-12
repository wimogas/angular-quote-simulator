import {NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from "./app.component";
import {RouterOutlet} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {AuthInterceptor} from "./auth/interceptors/auth-interceptor.service";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    SharedModule
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
