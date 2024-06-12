import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.scss'
})
export class QuoteListComponent implements OnInit {
  quoteList : any[] = []
  quoteFilter: string = '';
  isLoading: boolean = false;
  error: string | null = null

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.data.subscribe(data => {
      if (data['quotes']['error']) {
        this.error = data['quotes']['message'];
      } else {
        this.quoteList = data['quotes']['data']
      }
      this.isLoading = false
    })
  }
}
