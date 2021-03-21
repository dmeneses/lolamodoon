import { ChangeDetectorRef, Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil, map, switchMap, filter, first, tap, take } from 'rxjs/operators';
import { CaloriesCalculatorPipe } from 'src/app/shared/calories-calculator/calories-calculator.pipe';
import { FoodsService } from 'src/app/shared/foods-core/services/foods.service';
import { Food } from 'src/app/shared/models/food';
import { FoodType } from 'src/app/shared/models/food-type';
import { FoodSelectorComponent } from '../food-selector/food-selector.component';

@Component({
  selector: 'app-food-by-type-selector',
  templateUrl: './food-by-type-selector.component.html',
  styleUrls: ['./food-by-type-selector.component.scss']
})
export class FoodByTypeSelectorComponent implements OnInit {

  foodTypes = Object.keys(FoodType);
  filteredFoods: Food[];
  form = new FormGroup({
    foods: new FormControl([], Validators.required),
    calories: new FormControl(null, Validators.required),
    foodType: new FormControl(FoodType.protein, Validators.required),
  });
  availableFoods$: Observable<Food[]>;
  unsubscribe$ = new Subject();

  constructor(private bottomSheetRef: MatBottomSheetRef<FoodSelectorComponent>,
    private foodsService: FoodsService,
    private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.availableFoods$ = this.foodsService.foods$;
    const filterFood = (foodType, shouldTakeAll) =>  this.availableFoods$
      .pipe(
        shouldTakeAll ? tap() : take(2),
        map(foods => foods.filter(food => food.type === foodType))
      );
    
    filterFood('protein', false)
      .subscribe((filteredFoods) => {
        this.filteredFoods = filteredFoods;
        this.ref.detectChanges();
      });

    this.form.get('foodType').valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((foodType) => filterFood(foodType, true)
      )).subscribe((filteredFoods) => {
        this.filteredFoods = filteredFoods;
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
    if (this.form.invalid) {
      return;
    }

    const { foods, calories, foodType } = this.form.getRawValue();
    const dietFoods = foods.map(food => {
      const { protein, carbohydrate, fat, fiber, servingSizeUnit } = food;
      const originalServingSize = food.servingSize;
      const calorieCount = new CaloriesCalculatorPipe().transform(food);
      const newServingSize = Math.round(+calories *  originalServingSize / calorieCount);

      return { 
        food,
        servingSize: newServingSize,
        servingSizeUnit,
        protein: (protein * newServingSize) / originalServingSize,
        carbohydrate: (carbohydrate * newServingSize) / originalServingSize,
        fat: (fat * newServingSize) / originalServingSize,
        fiber: (fiber * newServingSize) / originalServingSize,
        calories: +calories
      };
    });

    this.bottomSheetRef.dismiss(dietFoods);
  }
}
