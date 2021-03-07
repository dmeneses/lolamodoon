import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { DietFood, DietSection } from 'src/app/shared/models/diet';
import { Patient } from 'src/app/shared/models/patient';
import { PatientsService } from 'src/app/shared/patients-core/services/patients.service';
import { DietsService } from '../services/diets.service';
import { FoodSectionSelectorComponent } from './food-section-selector/food-section-selector.component';
import { FoodSelectorComponent } from './food-selector/food-selector.component';
import { PatientSelectorComponent } from './patient-selector/patient-selector.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  patients: Patient[] = [];
  sections: DietSection[] = [];
  displayedColumns: string[] = ['name', 'servingSize', 'protein', 'carbohydrate', 'fat', 'fiber', 'calories', 'options',];
  patientsLoading$: Observable<boolean>;
  availablePatients$: Observable<Patient[]>;
  ref: MatBottomSheetRef;
  constructor(private bottomSheet: MatBottomSheet, private patientsService: PatientsService,
    private dietsService: DietsService) { }

  ngOnInit(): void {
    this.patientsLoading$ = this.patientsService.loading$;
    this.availablePatients$ = this.patientsService.patients$;
    this.dietsService.test$.subscribe((a) => {
      console.log('connected!', a)
      this.ref.dismiss();
    });
  }

  addSection(): void {
    const ref = this.bottomSheet.open<FoodSectionSelectorComponent, any, string>(FoodSectionSelectorComponent);
    ref.afterDismissed().subscribe((sectionName: string) => {
      if (sectionName) {
        this.sections.push({ name: sectionName, foods: [] as DietFood[] });
      }
    });
  }

  addFoodToSection(index: number): void {
    this.ref = this.bottomSheet.open<FoodSelectorComponent, any, DietFood>(FoodSelectorComponent);
    this.ref.afterDismissed().subscribe((food: DietFood) => {
      if (food) {
        this.sections[index].foods = [...this.sections[index].foods, food];
      }
    });
  }

  deleteSection(index: number): void {
    this.sections.splice(index, 1);
  }

  addPatient(): void {
    this.ref = this.bottomSheet.open(PatientSelectorComponent);
    this.ref.afterDismissed().subscribe((patient: Patient) => {
      console.log('aaa')
      if (patient) {
        this.patients.push(patient);
      }
    });
  }

  deletePatients() {

  }
}


