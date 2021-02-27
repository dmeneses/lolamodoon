import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/shared/models/firestore/firestore.service';
import { Food } from 'src/app/shared/models/food';

@Injectable()
export class FoodFirestoreService extends FirestoreService<Food> {

  protected basePath: string = 'foods';

  constructor(protected firestore: AngularFirestore) {
    super(firestore);
  }
}
