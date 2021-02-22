import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaloriesCalculatorPipe } from './calories-calculator.pipe';



@NgModule({
  declarations: [CaloriesCalculatorPipe],
  imports: [
    CommonModule
  ],
  exports: [CaloriesCalculatorPipe]
})
export class CaloriesCalculatorModule { }
