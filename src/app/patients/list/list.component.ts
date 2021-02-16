import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
export interface Patient {
  name: string;
  lastname: string;
  birthDate: Date;
  targetCalories: number;
  basalMetabolism: number;
  estimatedDailyEnergyExpenditure: number,
}

const ELEMENT_DATA: Patient[] = [
  {
    name: 'Juan',
    lastname: 'Perez',
    birthDate: new Date(),
    targetCalories: 1500,
    basalMetabolism: 1300,
    estimatedDailyEnergyExpenditure: 2400,
  },
  {
    name: 'Pedro',
    lastname: 'Perez',
    birthDate: new Date(),
    targetCalories: 1500,
    basalMetabolism: 1300,
    estimatedDailyEnergyExpenditure: 2400,
  },
  {
    name: 'Juan',
    lastname: 'Alcazar',
    birthDate: new Date(),
    targetCalories: 1500,
    basalMetabolism: 1300,
    estimatedDailyEnergyExpenditure: 2400,
  },
  {
    name: 'Mario',
    lastname: 'Perez',
    birthDate: new Date(),
    targetCalories: 1500,
    basalMetabolism: 1300,
    estimatedDailyEnergyExpenditure: 2400,
  },
  {
    name: 'Juan',
    lastname: 'Peredo',
    birthDate: new Date(),
    targetCalories: 1500,
    basalMetabolism: 1300,
    estimatedDailyEnergyExpenditure: 2400,
  }
];
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'lastname', 'birthDate', 'targetCalories', 'basalMetabolism', 'estimatedDailyEnergyExpenditure', 'options'];
  dataSource = ELEMENT_DATA;

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

}
