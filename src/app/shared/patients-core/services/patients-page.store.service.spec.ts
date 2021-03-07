import { TestBed } from '@angular/core/testing';

import { PatientsPageStoreService } from './patients-page.store.service';

describe('PatientsPage.StoreService', () => {
  let service: PatientsPageStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientsPageStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
