import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'patients', loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule), canActivate: [AuthGuard] },
  { path: 'foods', loadChildren: () => import('./foods/foods.module').then(m => m.FoodsModule), canActivate: [AuthGuard] },
  { path: 'diets', loadChildren: () => import('./diets/diets.module').then(m => m.DietsModule), canActivate: [AuthGuard] },
  { path: '',   redirectTo: '/patients', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
