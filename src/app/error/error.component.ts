import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit {
  errorMessage!: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.errorMessage = this.route.snapshot.data['message']
  }
}
