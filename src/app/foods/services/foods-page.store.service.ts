import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/core/firestore/store.service';
import { FoodsPage } from '../foods-page';

@Injectable({
  providedIn: 'root'
})
export class FoodsPageStoreService extends StoreService<FoodsPage> {
  protected store: string = 'foods-page';

  constructor() {
      super({
          loading: true,
          foods: [],
          totalFoods: 0
      })
  }
}
