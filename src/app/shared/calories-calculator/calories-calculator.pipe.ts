import { Pipe, PipeTransform } from '@angular/core';
import { Food } from '../models/food';

@Pipe({
  name: 'caloriesCalculator'
})
export class CaloriesCalculatorPipe implements PipeTransform {

  transform(value: Food, ...args: unknown[]): unknown {
    const {protein, carbohydrate, fat, fiber} = value;
    return protein * 4 + carbohydrate * 4 + fat * 8;
  }

}
