import { Injectable } from '@angular/core';
import { FirestoreService } from 'src/app/core/firestore/firestore.service';
import { Food } from 'src/app/shared/models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodFirestoreService extends FirestoreService<Food> {

  protected basePath: string = 'foods';

}
