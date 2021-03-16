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
import { MatCardModule } from '@angular/material/card';
import { BulkLoadComponent } from './bulk-load/bulk-load.component';
import { MatSelectModule } from '@angular/material/select';
import { FoodTypeModule } from '../shared/food-type/food-type.module';

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
      },
      {
        path: 'bulk-load',
        component: BulkLoadComponent
      },
      {
        path: ':id/edit',
        component: CreateComponent
      },
      {
        path: ':id',
        component: CreateComponent
      },
    ]
  }
];

@NgModule({
  declarations: [ListComponent, FoodsComponent, CreateComponent, BulkLoadComponent],
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
    MatCardModule,
    MatSelectModule,
    FlexLayoutModule,
    LolaLayoutModule,
    CaloriesCalculatorModule,
    FoodTypeModule,
  ]
})
export class FoodsModule { }
