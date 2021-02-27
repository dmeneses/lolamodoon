import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Food } from 'src/app/shared/models/food';
import { FoodMock } from '../../shared/models/mocks/food-mock';
import { FoodsService } from '../services/foods.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'protein', 'carbohydrate', 'fat', 'fiber', 'calories', 'options',];
  loading$: Observable<boolean>;
  foods$: Observable<Food[]>;
  noResults$: Observable<boolean>;

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(private foodService: FoodsService) { }

  ngOnInit(): void {
    this.loading$ = this.foodService.loading$;
    this.noResults$ = this.foodService.noResults$;
    this.foods$ = this.foodService.foods$;
  }

  deleteFood(food: Food) {
    this.foodService.delete(food.id).then();
  }
}
