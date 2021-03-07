import { TestBed } from '@angular/core/testing';

import { DietsPageStoreService } from './diets-page.store.service';

describe('DietsPageStoreService', () => {
  let service: DietsPageStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DietsPageStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
