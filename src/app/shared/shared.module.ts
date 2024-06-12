import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShortenPipe} from "./pipes/shorten.pipe";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {ModalComponent} from "./components/modal/modal.component";

@NgModule({
  declarations: [
    SpinnerComponent,
    ModalComponent,
    ShortenPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    SpinnerComponent,
    ModalComponent,
    ShortenPipe
  ]
})
export class SharedModule { }
