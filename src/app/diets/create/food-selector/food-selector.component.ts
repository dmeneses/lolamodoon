import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
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
  foods: Food[] = FoodMock;
  filteredFoods: Food[];
  form = new FormGroup({
    food: new FormControl(''),
    servingSize: new FormControl(0),
    servingSizeUnit: new FormControl('grams'),
    foodType: new FormControl('Proteína'),
  });
  availableFoods$: Observable<Food[]>;
  unsubscribe$ = new Subject();
  constructor(private bottomSheetRef: MatBottomSheetRef<FoodSelectorComponent>,
    private foodsService: FoodsService,
    private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.availableFoods$ = this.foodsService.foods$;
    
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
