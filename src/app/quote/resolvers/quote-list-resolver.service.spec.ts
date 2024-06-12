import { TestBed } from '@angular/core/testing';

import { QuoteListResolverService } from './quote-list-resolver.service';

describe('QuoteListResolverService', () => {
  let service: QuoteListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
