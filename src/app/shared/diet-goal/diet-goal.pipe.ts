import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dietGoal'
})
export class DietGoalPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value === 'muscle-gain'? 'Ganancia de masa muscular': 'Pérdida de grasa';
  }

}
