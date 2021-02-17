import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Food } from 'src/app/shared/models/food';
import { FoodMock } from 'src/app/shared/models/mocks/food-mock';
import { PatientMock } from 'src/app/shared/models/mocks/patient-mock';
import { Patient } from 'src/app/shared/models/patient';
import { PatientSelectorComponent } from '../patient-selector/patient-selector.component';

@Component({
  selector: 'app-food-selector',
  templateUrl: './food-selector.component.html',
  styleUrls: ['./food-selector.component.scss']
})
export class FoodSelectorComponent implements OnInit {
  foodTypes = ['protein', 'fat', 'carbohydrate'];
  foods: Food[] = FoodMock;
  filteredFoods: Observable<Food[]>;
  form = new FormGroup({
    foodId: new FormControl(''),
    servingSize: new FormControl(0),
    servingSizeUnit: new FormControl('grams'),
    foodType: new FormControl('Proteína'),
  });

  constructor(private bottomSheetRef: MatBottomSheetRef<PatientSelectorComponent>) { }

  ngOnInit(): void {
    this.filteredFoods = this.form.controls.foodId.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(value))
      );
  }

  showFood(foodId: string) {
    if (foodId) {
      const { name } = this.foods.find(food => foodId === food.foodId);
      return `${name}`;
    }

    return '';
  }

  addFood() {
    const { foodId, servingSize, servingSizeUnit, foodType } = this.form.getRawValue();
    const food = this.foods.find(food => foodId === food.foodId);
    const { protein, carbohydrate, fat, fiber } = food;
    const originalServingSize = food.servingSize;
    const dietFood = { 
      food,
      servingSize,
      servingSizeUnit,
      protein: (protein * servingSize) / originalServingSize,
      carbohydrate: (carbohydrate * servingSize) / originalServingSize,
      fat: (fat * servingSize) / originalServingSize,
      fiber: (fiber * servingSize) / originalServingSize,
      foodType,
      calories: 0
    };
    dietFood.calories = dietFood.protein*2 + dietFood.carbohydrate*4 + dietFood.fat*9;
    console.log(dietFood);
    this.bottomSheetRef.dismiss(dietFood);
  }

  getFoodTypeName(foodType: string) {
    switch (foodType) {
      case 'protein':
        return 'Proteína';
      case 'carbohydrate':
        return 'Carbohidrato';
      case 'fat':
        return 'Grasa';
    }
  }
  private filter(value: string): Food[] {
    const filterValue = value.toLowerCase();
    return this.foods.filter(patient => patient.name.toLowerCase().includes(filterValue));
  }

}
