import { Pipe, PipeTransform } from '@angular/core';
import { FoodType, FoodTypeTranslationMap } from '../models/food-type';

@Pipe({
  name: 'foodType'
})
export class FoodTypePipe implements PipeTransform {
  transform(value: FoodType, ...args: unknown[]): unknown {
    return FoodTypeTranslationMap[value];
  }
}
