import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ListComponent } from './list/list.component';
import { FoodsComponent } from './foods.component';
import { LolaLayoutModule } from '../shared/layout/lola-layout.module';
import { CreateComponent } from './create/create.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CaloriesCalculatorModule } from '../shared/calories-calculator/calories-calculator.module';

const routes = [
  {
    path: '',
    component: FoodsComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'create',
        component: CreateComponent
      }
    ]
  }
];

@NgModule({
  declarations: [ListComponent, FoodsComponent, CreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    LolaLayoutModule,
    CaloriesCalculatorModule,
  ]
})
export class FoodsModule { }
