import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShortenPipe} from "./pipes/shorten.pipe";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {ModalComponent} from "./components/modal/modal.component";
import {CapitalizePipe} from "./pipes/capitalize.pipe";

@NgModule({
  declarations: [
    SpinnerComponent,
    ModalComponent,
    ShortenPipe,
    CapitalizePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    SpinnerComponent,
    ModalComponent,
    ShortenPipe,
    CapitalizePipe
  ]
})
export class SharedModule { }
