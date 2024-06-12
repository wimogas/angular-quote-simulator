import { Component, EventEmitter, Input, Output } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() isVisible: boolean = false;
  @Input() message: string = ''

  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.isVisible = false;
    this.closeModal.emit();
  }
}
