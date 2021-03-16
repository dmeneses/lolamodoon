import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodTypePipe } from './food-type.pipe';



@NgModule({
  declarations: [FoodTypePipe],
  imports: [
    CommonModule
  ],
  exports: [FoodTypePipe]
})
export class FoodTypeModule { }
