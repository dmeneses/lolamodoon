import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsService } from './services/patients.service';
import { PatientsPageStoreService } from './services/patients-page.store.service';
import { PatientsFirestoreService } from './services/patients.firestore.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    PatientsService,
    PatientsPageStoreService,
    PatientsFirestoreService,
  ]
})
export class PatientsCoreModule { }
