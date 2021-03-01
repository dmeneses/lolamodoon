import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietGoalPipe } from './diet-goal.pipe';



@NgModule({
  declarations: [DietGoalPipe],
  imports: [
    CommonModule
  ],
  exports: [DietGoalPipe]
})
export class DietGoalModule { }
