import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: ListComponent,
  }
];

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FoodsModule { }
