import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Patient } from '../../shared/models/patient';

const ELEMENT_DATA: Patient[] = [
  {
    patientId: '1',
    name: 'Juan',
    lastname: 'Perez',
    birthDate: new Date(),
    targetCalories: 1500,
    basalMetabolism: 1300,
    estimatedDailyEnergyExpenditure: 2400,
  },
  {
    patientId: '2',
    name: 'Pedro',
    lastname: 'Perez',
    birthDate: new Date(),
    targetCalories: 1500,
    basalMetabolism: 1300,
    estimatedDailyEnergyExpenditure: 2400,
  },
  {
    patientId: '3',
    name: 'Juan',
    lastname: 'Alcazar',
    birthDate: new Date(),
    targetCalories: 1500,
    basalMetabolism: 1300,
    estimatedDailyEnergyExpenditure: 2400,
  },
  {
    patientId: '4',
    name: 'Mario',
    lastname: 'Perez',
    birthDate: new Date(),
    targetCalories: 1500,
    basalMetabolism: 1300,
    estimatedDailyEnergyExpenditure: 2400,
  },
  {
    patientId: '5',
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
