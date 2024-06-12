import { TestBed } from '@angular/core/testing';

import { QuoteListResolverService } from './quote-list-resolver.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('QuoteListResolverService', () => {
  let service: QuoteListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(QuoteListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
