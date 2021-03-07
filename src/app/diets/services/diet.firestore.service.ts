import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Diet } from 'src/app/shared/models/diet';
import { FirestoreService } from 'src/app/shared/models/firestore/firestore.service';

@Injectable()
export class DietFirestoreService extends FirestoreService<Diet> {

  protected basePath: string = 'diets';

  constructor(protected firestore: AngularFirestore) {
    super(firestore);
  }
}
