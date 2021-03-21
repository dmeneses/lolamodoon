import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CaloriesCalculatorPipe } from '../../shared/calories-calculator/calories-calculator.pipe';
import { Food, FoodCreator } from '../../shared/models/food';
import { FoodType } from '../../shared/models/food-type';
import { FoodsService } from '../../shared/foods-core/services/foods.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createFoodForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    type: new FormControl(FoodType.protein),
    protein: new FormControl(0, [Validators.required]),
    carbohydrate: new FormControl(0, [Validators.required]),
    fat: new FormControl(0, [Validators.required]),
    fiber: new FormControl(0, [Validators.required]),
    servingSize: new FormControl({value: 100, disabled: true}),
    servingSizeUnit: new FormControl({value: 'grams', disabled: true}),
  });
  foodTypes = Object.keys(FoodType);
  calorieCount = 0;
  isEdit = false;
  loading$;

  constructor(private foodService: FoodsService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading$ = this.foodService.loading$;

    this.createFoodForm.valueChanges.subscribe((foodInfo) => {
      this.calorieCount = new CaloriesCalculatorPipe().transform(foodInfo);
    });

    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      this.isEdit = true;
      this.foodService.foods$.subscribe((foods: Food[]) => {
        const food = foods.find((food) => food.id === id);
        if (food) {
          this.createFoodForm.patchValue(food);
        }
      });
    }
  }

  saveFood() {
    if (this.createFoodForm.valid) {
      const food = FoodCreator.createFoodFromFormValue(this.createFoodForm.getRawValue());
      this.foodService.create(food)
        .then(() => this.router.navigate(['foods']));
    }
  }

  updateFood() {
    if (this.createFoodForm.valid) {
      const food = FoodCreator.createFoodFromFormValue(this.createFoodForm.getRawValue());
      this.foodService.update(food)
        .then(() => this.router.navigate(['foods']));
    }
  }
}
