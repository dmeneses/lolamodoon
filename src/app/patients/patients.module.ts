import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { PatientsComponent } from './patients.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LolaLayoutModule } from '../shared/layout/lola-layout.module';
import { CreateComponent } from './create/create.component';

const routes = [
  {
    path: '',
    component: PatientsComponent,
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
  declarations: [ListComponent, PatientsComponent, CreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    LolaLayoutModule,
  ]
})
export class PatientsModule { }
