import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietsComponent } from './diets.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LolaLayoutModule } from '../shared/layout/lola-layout.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';

const routes = [
  {
    path: '',
    component: DietsComponent,
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
        path: ':id',
        component: ViewComponent
      }
    ]
  }
];

@NgModule({
  declarations: [DietsComponent, ListComponent, CreateComponent, ViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    LolaLayoutModule,
  ]
})
export class DietsModule { }
