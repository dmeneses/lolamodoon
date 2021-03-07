import { TestBed } from '@angular/core/testing';

import { DietFirestoreService } from './diet.firestore.service';

describe('Diet.FirestoreService', () => {
  let service: DietFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DietFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
