import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface Food {
  name: string;
  description?: string;
  protein: number;
  carbohydrate: number;
  fat: number;
  fiber: number;
  calories: number;
  servingSize: number;
  servingSizeUnit: string;
}

const ELEMENT_DATA: Food[] = [
  {
    name: 'Pechuga de Pollo',
    protein: 20,
    carbohydrate: 0,
    fat: 1.88,
    fiber: 0,
    calories: 147.4,
    servingSize: 100,
    servingSizeUnit: 'grams',
  },
  {
    name: 'Palta',
    protein: 1.2,
    carbohydrate: 5.1,
    fat: 8.8,
    fiber: 4.02,
    calories: 104.4,
    servingSize: 100,
    servingSizeUnit: 'grams'
  },
  {
    name: 'Choclo Blanco Crudo',
    protein: 4.29,
    carbohydrate:  36.1,
    fat:  1.04,
    fiber:  3.51,
    calories:  170.92,
    servingSize: 100,
    servingSizeUnit: 'grams'
  },
];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'protein', 'carbohydrate', 'fat', 'fiber', 'calories', 'actions',];
  dataSource = ELEMENT_DATA;

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

}
