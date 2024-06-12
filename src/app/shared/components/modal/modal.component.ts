import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title: string = 'Modal'
  @Output() onCloseModal = new EventEmitter<void>();

  onClose() {
    this.onCloseModal.emit();
  }
}
