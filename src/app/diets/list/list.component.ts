import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Diet } from 'src/app/shared/models/diet';
import { FoodMock } from 'src/app/shared/models/mocks/food-mock';

const ELEMENT_DATA: Diet = 
  {
    name: 'Dieta para Ana',
    patientsIds: ['3'],
    dietSections: [
      {
        name: 'Almuerzo',
        foods: [
          {
            food: FoodMock[0],
            calories: 250,
            servingSize: 240,
            servingSizeUnit: 'grams'
          }
        ]
      },
      {
        name: 'Cena',
        foods: [
          {
            food: FoodMock[1],
            calories: 250,
            servingSize: 240,
            servingSizeUnit: 'grams'
          }
        ]
      }
    ]
  };

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'patientsCount', 'sectionsCount', 'options'];
  dataSource = [{name: ELEMENT_DATA.name, patientsCount: ELEMENT_DATA.patientsIds.length, sectionsCount: ELEMENT_DATA.dietSections.length}];
  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

}
