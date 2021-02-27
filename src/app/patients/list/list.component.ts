import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';

import { Patient } from 'src/app/shared/models/patient';
import { PatientsService } from '../services/patients.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'lastname', 'birthDate', 'targetCalories', 'basalMetabolism', 'estimatedDailyEnergyExpenditure', 'options'];
  loading$: Observable<boolean>;
  patients$: Observable<Patient[]>;
  noResults$: Observable<boolean>;

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(private patientsService: PatientsService) { }

  ngOnInit(): void {
    this.loading$ = this.patientsService.loading$;
    this.noResults$ = this.patientsService.noResults$;
    this.patients$ = this.patientsService.patients$;
  }

  deleteFood(patient: Patient) {
    this.patientsService.delete(patient.id).then();
  }
}
