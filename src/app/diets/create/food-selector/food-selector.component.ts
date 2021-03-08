import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { CaloriesCalculatorPipe } from 'src/app/shared/calories-calculator/calories-calculator.pipe';
import { FoodsService } from 'src/app/shared/foods-core/services/foods.service';
import { Food } from 'src/app/shared/models/food';
import { FoodMock } from 'src/app/shared/models/mocks/food-mock';

@Component({
  selector: 'app-food-selector',
  templateUrl: './food-selector.component.html',
  styleUrls: ['./food-selector.component.scss']
})
export class FoodSelectorComponent implements OnInit {
  foodTypes = ['protein', 'fat', 'carbohydrate'];
  filteredFoods: Food[];
  form = new FormGroup({
    food: new FormControl(null, Validators.required),
    servingSize: new FormControl(null, Validators.required),
    servingSizeUnit: new FormControl('grams', Validators.required),
    foodType: new FormControl('protein', Validators.required),
  });
  availableFoods$: Observable<Food[]>;
  unsubscribe$ = new Subject();

  form2 = new FormGroup({
    servingSizeInCalories: new FormControl(null, Validators.required),
  });

  calorieCount = 0;
  servingSize = 0;

  constructor(private bottomSheetRef: MatBottomSheetRef<FoodSelectorComponent>,
    private foodsService: FoodsService,
    private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.availableFoods$ = this.foodsService.foods$;
    
    this.form.controls.food.valueChanges.subscribe((foodInfo) => {
      this.calorieCount = new CaloriesCalculatorPipe().transform(foodInfo);
      this.servingSize = foodInfo.servingSize;
    });

    this.form.controls.servingSize.valueChanges.subscribe((servingSize) => {
      if (this.calorieCount > 0 && this.servingSize > 0) {
        this.form2.patchValue({ servingSizeInCalories: Math.round(servingSize * this.calorieCount / this.servingSize) }, {emitEvent: false});
      }
    });

    this.form2.controls.servingSizeInCalories.valueChanges.subscribe((servingSizeInCalories) => {
      if (this.calorieCount > 0 && this.servingSize > 0) {
        this.form.patchValue({ servingSize: Math.round(servingSizeInCalories *  this.servingSize / this.calorieCount) }, {emitEvent: false});
      }
    });

    combineLatest([
      this.form.controls.food.valueChanges,
      this.availableFoods$
    ]).pipe(
      takeUntil(this.unsubscribe$),
      map(([foodName, foods]) => typeof foodName === 'string' ?
        foods.filter(food => food.name.toLowerCase().includes(foodName.toLowerCase())) : []
      )
    ).subscribe((results) => {
      this.filteredFoods = results;
      this.ref.detectChanges();
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  showFood(food: Food) {
    if (food) {
      return `${food.name}`;
    }

    return '';
  }

  addFood() {
    if (this.form.invalid || this.form2.invalid) {
      return;
    }

    const { food, servingSize, servingSizeUnit, foodType } = this.form.getRawValue();
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
}
