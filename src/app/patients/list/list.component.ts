import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PatientMock } from '../../shared/models/mocks/patient-mock';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'lastname', 'birthDate', 'targetCalories', 'basalMetabolism', 'estimatedDailyEnergyExpenditure', 'options'];
  dataSource = PatientMock;

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

}
