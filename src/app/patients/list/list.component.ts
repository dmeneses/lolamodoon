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

  displayedColumns: string[] = ['name', 'gender', 'dietGoal', 'targetCalories', 'refeedTargetCalories', 'dietDeficit', 'options'];
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
          .map(({id, name, gender, dietGoal, weight, dietGoalPace, activityLevelMeasure, refeedsPerWeek}) => {
            const modifiedWeight = +weight * 2.20462;
            const maintenanceCalories = Math.round(modifiedWeight * 10 * +activityLevelMeasure);
      
            return {
              id,
              name, gender,
              dietGoal,
              targetCalories: dietGoal === 'muscle-gain' ? 
                Math.round(maintenanceCalories + ((modifiedWeight * +dietGoalPace * 3500) / 4 / 7)) :
                Math.round(maintenanceCalories - (3500 * modifiedWeight * +dietGoalPace) / (7 - +refeedsPerWeek)),
              refeedTargetCalories: dietGoal === 'muscle-gain' ? '-' : maintenanceCalories,
              dietDeficit: dietGoal === 'muscle-gain' ? '-' :
                Math.round(3500 * modifiedWeight * +dietGoalPace)
            };
          }))
      );
  }

  deleteFood(patient: Patient) {
    this.patientsService.delete(patient.id).then();
  }
}
