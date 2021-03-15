import { ChangeDetectorRef, Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { CaloriesCalculatorPipe } from 'src/app/shared/calories-calculator/calories-calculator.pipe';
import { FoodsService } from 'src/app/shared/foods-core/services/foods.service';
import { Food } from 'src/app/shared/models/food';
import { FoodSelectorComponent } from '../food-selector/food-selector.component';

@Component({
  selector: 'app-food-by-type-selector',
  templateUrl: './food-by-type-selector.component.html',
  styleUrls: ['./food-by-type-selector.component.scss']
})
export class FoodByTypeSelectorComponent implements OnInit {

  foodTypes = ['protein', 'fat', 'carbohydrate'];
  filteredFoods: Food[];
  form = new FormGroup({
    foods: new FormControl([], Validators.required),
    calories: new FormControl(null, Validators.required),
    foodType: new FormControl('protein', Validators.required),
  });
  availableFoods$: Observable<Food[]>;
  unsubscribe$ = new Subject();

  constructor(private bottomSheetRef: MatBottomSheetRef<FoodSelectorComponent>,
    private foodsService: FoodsService,
    private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.availableFoods$ = this.foodsService.foods$;
    
    // combineLatest([
    //   this.form.controls.food.valueChanges,
    //   this.availableFoods$
    // ]).pipe(
    //   takeUntil(this.unsubscribe$),
    //   map(([foodName, foods]) => typeof foodName === 'string' ?
    //     foods.filter(food => food.name.toLowerCase().includes(foodName.toLowerCase())) : []
    //   )
    // ).subscribe((results) => {
    //   this.filteredFoods = results;
    //   this.ref.detectChanges();
    // });
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
    if (this.form.invalid) {
      return;
    }

    const { foods, calories, foodType } = this.form.getRawValue();
    const dietFoods = foods.map(food => {
      console.log(food);
      const { protein, carbohydrate, fat, fiber, servingSizeUnit } = food;
      const originalServingSize = food.servingSize;
      const calorieCount = new CaloriesCalculatorPipe().transform(food);
      const newServingSize = Math.round(+calories *  originalServingSize / calorieCount);
      console.log(newServingSize, calories, originalServingSize, calorieCount);
      return { 
        food,
        servingSize: newServingSize,
        servingSizeUnit,
        protein: (protein * newServingSize) / originalServingSize,
        carbohydrate: (carbohydrate * newServingSize) / originalServingSize,
        fat: (fat * newServingSize) / originalServingSize,
        fiber: (fiber * newServingSize) / originalServingSize,
        foodType,
        calories: +calories
      };
    });
    console.log(dietFoods);
    this.bottomSheetRef.dismiss(dietFoods);
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
