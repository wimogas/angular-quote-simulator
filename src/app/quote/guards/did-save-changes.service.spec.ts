import { TestBed } from '@angular/core/testing';

import {DidSaveChangesGuard} from './did-save-changes.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DidSaveChangesService', () => {
  let service: DidSaveChangesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DidSaveChangesGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
