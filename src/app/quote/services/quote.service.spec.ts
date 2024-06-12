import { TestBed } from '@angular/core/testing';

import { QuoteService } from './quote.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('QuoteService', () => {
  let service: QuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(QuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
