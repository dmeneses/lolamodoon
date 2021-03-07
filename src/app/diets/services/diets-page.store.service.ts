import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/shared/models/firestore/store.service';
import { DietsPage } from '../diets-page';

@Injectable()
export class DietsPageStoreService extends StoreService<DietsPage> {

  protected store: string = 'diets-page';

  constructor() {
      super({
          loading: true,
          diets: [],
          totalDiets: 0
      })
  }
}
