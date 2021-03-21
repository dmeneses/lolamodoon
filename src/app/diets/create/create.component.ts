import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router, ActivatedRoute } from '@angular/router';
import * as printJS from 'print-js';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Diet, DietFood, DietSection } from 'src/app/shared/models/diet';
import { Patient } from 'src/app/shared/models/patient';
import { PdfGenerator } from 'src/app/shared/models/pdf-generator';
import { PatientsService } from 'src/app/shared/patients-core/services/patients.service';
import { DietsService } from '../services/diets.service';
import { FoodByTypeSelectorComponent } from './food-by-type-selector/food-by-type-selector.component';
import { FoodSectionSelectorComponent } from './food-section-selector/food-section-selector.component';
import { FoodSelectorComponent } from './food-selector/food-selector.component';
import { PatientSelectorComponent } from './patient-selector/patient-selector.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  patients$: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>([]);
  sections: DietSection[] = [
    { name: 'Almuerzo', foods: [] },
    { name: 'Cena', foods: [] }
  ];
  displayedColumns: string[] = ['name', 'servingSize', 'protein', 'carbohydrate', 'fat', 'fiber', 'calories', 'options',];
  patientsLoading$: Observable<boolean>;
  dietsLoading$: Observable<boolean>;
  unsubscribe$ = new Subject();
  showError = false;
  isEdit = false;
  currentDiet: Diet;

  constructor(private bottomSheet: MatBottomSheet, private patientsService: PatientsService,
    private dietsService: DietsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.patientsLoading$ = this.patientsService.loading$;
    this.dietsLoading$ = this.dietsService.loading$;
   
    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      this.isEdit = true;
      this.dietsService.diets$.subscribe((diets: Diet[]) => {
        const diet = diets.find((diet) => diet.id === id);
        if (diet) {
          this.currentDiet = diet;
          this.sections = diet.dietSections;
          this.patientsService
            .getFilteredDietPatients(diet.patientsIds)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(patients => this.patients$.next(patients));
        }
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
    const ref = this.bottomSheet.open<FoodSelectorComponent, any, DietFood>(FoodSelectorComponent);
    ref.afterDismissed().subscribe((food: DietFood) => {
      if (food) {
        const newFoodsForSection = [...this.sections[index].foods, food]
          .reduce((groups, dietFood) => {
            groups[dietFood.food.type] = groups[dietFood.food.type].concat([dietFood])
              .sort((dietFoodA, dietFoodB) => dietFoodA.food.name > dietFoodB.food.name ? 1 : dietFoodA.food.name < dietFoodB.food.name ?  -1 : 0);
          
            return groups;
          }, { protein: [], carbohydrate: [], fat: [], vegetable: [] })

        this.sections[index].foods = [].concat.apply([], Object.values(newFoodsForSection));
      }
    });
  }

  addFoodsByType(index: number): void {
    const ref = this.bottomSheet.open<FoodByTypeSelectorComponent, any, DietFood[]>(FoodByTypeSelectorComponent);
    ref.afterDismissed().subscribe((foods: DietFood[]) => {
      if (foods) {
        const newFoodsForSection = [...this.sections[index].foods, ...foods]
          .reduce((groups, dietFood) => {
            groups[dietFood.food.type] = groups[dietFood.food.type].concat([dietFood])
              .sort((dietFoodA, dietFoodB) => dietFoodA.food.name > dietFoodB.food.name ? 1 : dietFoodA.food.name < dietFoodB.food.name ?  -1 : 0);
           
            return groups;
          }, { protein: [], carbohydrate: [], fat: [], vegetable: [] })

        this.sections[index].foods = [].concat.apply([], Object.values(newFoodsForSection));
      }
    });
  }

  deleteSection(index: number): void {
    this.sections.splice(index, 1);
  }

  addPatient(): void {
    const ref = this.bottomSheet.open(PatientSelectorComponent);
    ref.afterDismissed().subscribe((patient: Patient) => {
      if (patient) {
        this.patients$.next([...this.patients$.value, patient]);
      }
    });
  }

  deletePatient(patient: Patient, index: number) {
    const patients = [...this.patients$.value];
    patients.splice(index, 1);
    this.patients$.next(patients);
  }

  deleteFoodFromSection(sectionIndex: number, foodIndex: number): void {
    const newFoods = [...this.sections[sectionIndex].foods];
    newFoods.splice(foodIndex, 1);
    this.sections[sectionIndex].foods = newFoods;
  }

  createDiet() {
    if (this.sections.length === 0 || this.patients$.value.length === 0) {
      this.showError = true;
      return;
    } 

    this.showError = false;
    this.dietsService.create({
      name: `Dieta para: ${this.patients$.value.map(patient => patient.name).join(', ')}`,
      patientsIds: this.patients$.value.map(patient => patient.id),
      dietSections: this.sections,
    }).then(() => {
      this.router.navigate(['diets']);
    });
  }

  updateDiet() {
    if (this.sections.length === 0 || this.patients$.value.length === 0) {
      this.showError = true;
      return;
    } 

    this.showError = false;
    this.dietsService.update({
      ...this.currentDiet,
      name: `Dieta para: ${this.patients$.value.map(patient => patient.name).join(', ')}`,
      patientsIds: this.patients$.value.map(patient => patient.id),
      dietSections: this.sections,
    }).then(() => {
      this.router.navigate(['diets']);
    });
  }

  printDiet() {
    const patients = this.patients$.value;
    printJS({
      repeatTableHeader: false,
      type: 'raw-html',
      printable: PdfGenerator.generatePDF(this.sections, patients[0]),
      style: PdfGenerator.generateStyles()
    });
  }
}


