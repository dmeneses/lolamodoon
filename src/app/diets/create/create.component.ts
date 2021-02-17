import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DietFood, DietSection } from 'src/app/shared/models/diet';
import { Patient } from 'src/app/shared/models/patient';
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

  constructor(private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {

  }

  addSection(): void {
    const ref = this._bottomSheet.open<FoodSectionSelectorComponent, any, string>(FoodSectionSelectorComponent);
    ref.afterDismissed().subscribe((sectionName: string) => {
      if (sectionName) {
        this.sections.push({ name: sectionName, foods: [] as DietFood[] });
      }
    });
  }

  addFoodToSection(index: number): void {
    const ref = this._bottomSheet.open<FoodSelectorComponent, any, DietFood>(FoodSelectorComponent);
    ref.afterDismissed().subscribe((food: DietFood) => {
      if (food) {
        this.sections[index].foods = [...this.sections[index].foods, food];
      }
    });
  }

  deleteSection(index: number): void {
    this.sections.splice(index, 1);
  }

  addPatient(): void {
    const ref = this._bottomSheet.open<PatientSelectorComponent, any, Patient>(PatientSelectorComponent);
    ref.afterDismissed().subscribe((patient: Patient) => {
      if (patient) {
        this.patients.push(patient);
      }
    });
  }

  deletePatients() {

  }
}


