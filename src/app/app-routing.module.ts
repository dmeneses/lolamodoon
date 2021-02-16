import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'patients', loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule) },
  { path: 'foods', loadChildren: () => import('./foods/foods.module').then(m => m.FoodsModule) },
  { path: 'diets', loadChildren: () => import('./diets/diets.module').then(m => m.DietsModule) },
  { path: '',   redirectTo: '/patients', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
