import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { PatientsComponent } from './patients.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LolaLayoutModule } from '../shared/layout/lola-layout.module';

const routes = [
  {
    path: '',
    component: PatientsComponent,
    children: [
      {
        path: '',
        component: ListComponent
      }
    ]
  }
];

@NgModule({
  declarations: [ListComponent, PatientsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    LolaLayoutModule,
  ]
})
export class PatientsModule { }
