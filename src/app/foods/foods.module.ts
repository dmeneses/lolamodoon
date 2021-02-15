import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ListComponent } from './list/list.component';
import { FoodsComponent } from './foods.component';
import { LolaLayoutModule } from '../shared/layout/lola-layout.module';
import { CreateComponent } from './create/create.component';

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
    MatToolbarModule,
    LolaLayoutModule,
  ]
})
export class FoodsModule { }
