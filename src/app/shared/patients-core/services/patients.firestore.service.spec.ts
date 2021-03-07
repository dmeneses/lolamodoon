import { TestBed } from '@angular/core/testing';

import { PatientsFirestoreService } from './patients.firestore.service';

describe('Patients.FirestoreService', () => {
  let service: PatientsFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientsFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
