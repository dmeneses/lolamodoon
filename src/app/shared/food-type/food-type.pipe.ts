import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'foodType'
})
export class FoodTypePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'protein':
        return 'Proteína';
      case 'carbohydrate':
        return 'Carbohidrato';
      case 'fat':
        return 'Grasa';
      case 'vegetable':
        return 'Vegetales';
    }
  }

}
