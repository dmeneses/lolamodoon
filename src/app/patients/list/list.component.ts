import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Patient } from 'src/app/shared/models/patient';
import { PatientsService } from '../services/patients.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'gender', 'pathology', 'dietGoal', 'basalMetabolicRate', 'maintenanceCalories', 'targetCalories',   'options'];
  loading$: Observable<boolean>;
  patients$: Observable<any>;
  noResults$: Observable<boolean>;

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(private patientsService: PatientsService) { }

  ngOnInit(): void {
    this.loading$ = this.patientsService.loading$;
    this.noResults$ = this.patientsService.noResults$;
    this.patients$ = this.patientsService.patients$
      .pipe(
        map((patients) => patients
          .map(({id, name, pathology, gender, weight, height, age, dietGoal, dietGoalPace, activityLevelMeasure, refeedsPerWeek}) => {
            const modifiedWeight = +weight * 2.20462;
            const maintenanceCalories = Math.round(modifiedWeight * 10 * +activityLevelMeasure);
      
            return {
              id,
              name, gender, pathology,
              dietGoal,
              targetCalories: dietGoal === 'muscle-gain' ? 
                maintenanceCalories + ((modifiedWeight * +dietGoalPace * 3500) / 4 / 7) :
                maintenanceCalories - (3500 * modifiedWeight * +dietGoalPace) / (7 - +refeedsPerWeek),
              maintenanceCalories,
              basalMetabolicRate: (10 * +weight) + (6.25 * +height) - 5 * (+age) 
                + (gender === 'male' ? +5 : -161),
            };
          }))
      );
  }

  deleteFood(patient: Patient) {
    this.patientsService.delete(patient.id).then();
  }
}
