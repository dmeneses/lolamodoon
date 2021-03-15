import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodsService } from 'src/app/shared/foods-core/services/foods.service';

@Component({
  selector: 'app-bulk-load',
  templateUrl: './bulk-load.component.html',
  styleUrls: ['./bulk-load.component.scss']
})
export class BulkLoadComponent implements OnInit {
  loading = false;
  foods = new FormGroup({
    jsonFoods: new FormControl(null, [Validators.required])
  });

  constructor(private foodsService: FoodsService) { }

  ngOnInit(): void {
  }

  async saveFoods() {
    if (this.foods.valid) {
      this.loading = true;
      const { jsonFoods } = this.foods.getRawValue();
      console.log(jsonFoods);
      const actualFoods = JSON.parse(jsonFoods);

      for (const food of actualFoods) {
        delete food.calories;
        food.description = '';
        food.servingSize = 100;
        food.servingSizeUnit = 'grams';
        await this.foodsService.create(food);
      }

      this.loading = false;
    }
  }
}
