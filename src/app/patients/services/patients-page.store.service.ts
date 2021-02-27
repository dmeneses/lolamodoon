import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/shared/models/firestore/store.service';
import { PatientsPage } from '../patients-page';

@Injectable()
export class PatientsPageStoreService extends StoreService<PatientsPage> {
  protected store: string = 'patients-page';

  constructor() {
    super({
      loading: true,
      patients: [],
      totalPatients: 0
    });
  }
}
