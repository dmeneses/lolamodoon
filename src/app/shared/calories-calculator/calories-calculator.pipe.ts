import { Pipe, PipeTransform } from '@angular/core';
import { Food } from '../models/food';

@Pipe({
  name: 'caloriesCalculator'
})
export class CaloriesCalculatorPipe implements PipeTransform {

  transform(value: Food, ...args: unknown[]): number {
    if (!value) return 0;
    const {protein, carbohydrate, fat, fiber} = value;
    return Math.round(protein * 4 + carbohydrate * 4 + fat * 8);
  }

}
