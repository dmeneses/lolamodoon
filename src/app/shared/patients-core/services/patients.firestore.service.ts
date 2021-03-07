import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { FirestoreService } from 'src/app/shared/models/firestore/firestore.service';
import { Patient } from 'src/app/shared/models/patient';

@Injectable()
export class PatientsFirestoreService extends FirestoreService<Patient> {

  protected basePath: string = 'patients';

  constructor(protected firestore: AngularFirestore) {
    super(firestore);
  }
}
