import { TestBed } from '@angular/core/testing';

import { FoodFirestoreService } from './food.firestore.service';

describe('FoodFirestoreService', () => {
  let service: FoodFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
