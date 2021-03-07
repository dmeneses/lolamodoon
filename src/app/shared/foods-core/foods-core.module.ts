import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodFirestoreService } from './services/food.firestore.service';
import { FoodsPageStoreService } from './services/foods-page.store.service';
import { FoodsService } from './services/foods.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    FoodsService,
    FoodFirestoreService,
    FoodsPageStoreService
  ]
})
export class FoodsCoreModule { }
