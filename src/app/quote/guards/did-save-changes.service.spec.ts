import { TestBed } from '@angular/core/testing';

import { DidSaveChangesService } from './did-save-changes.service';

describe('DidSaveChangesService', () => {
  let service: DidSaveChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DidSaveChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
