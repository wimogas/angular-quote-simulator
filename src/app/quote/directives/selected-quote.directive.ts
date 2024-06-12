import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appSelectedQuote]',
})
export class SelectedQuoteDirective {

  @HostBinding('style.borderColor') borderColor: string = 'transparent'

  constructor() {}

  @HostListener('change', ['$event.target']) onChange(target: HTMLInputElement) {
    if (target.type === 'checkbox') {
      if (target.checked) {
        this.borderColor = '#6c97fd'
      } else {
        this.borderColor = 'transparent'
      }
    }
  }
}
