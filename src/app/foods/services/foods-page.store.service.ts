import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/shared/models/firestore/store.service';
import { FoodsPage } from '../foods-page';

@Injectable()
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
