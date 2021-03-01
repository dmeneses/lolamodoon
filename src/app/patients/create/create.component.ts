import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsService } from 'src/app/patients/services/patients.service';
import { Patient } from 'src/app/shared/models/patient';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createPatientForm2 = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('female', [Validators.required]),
    weight: new FormControl(0, [Validators.required]),
    activityLevel: new FormControl(0, [Validators.required]),
    activityLevelMeasure: new FormControl(1.3, [Validators.required]),
    corporalFatPercentage: new FormControl(10, [Validators.required]),

    // Balance Energetico
    dietGoal: new FormControl('muscle-gain', [Validators.required]),
    dietGoalPace: new FormControl(1.5, [Validators.required]),
    refeedsPerWeek: new FormControl(1, [Validators.required]),
  });

  isEdit = false;
  maintenanceCalories = 0;
  targetCalories = 0;
  refeedTargetCalories = 0;
  dietDeficit = 0;

  genderOptions = [
    {
      label: 'Femenino',
      value: 'female'
    },
    {
      label: 'Masculino',
      value: 'male'
    }
  ];

  activityLevelOptions = [
    {
      label: 'Sedentario y 3-6 días de entrenamiento con pesas a la semana',
      value: 0
    },
    {
      label: 'Ligeramente activo y 3-6 días de entrenamiento con pesas a la semana',
      value: 1
    },
    {
      label: 'Activo y 3-6 días de entrenamiento con pesas a la semana',
      value: 2
    },
    {
      label: 'Muy activo y 3-6 días de entrenamiento con pesas a la semana',
      value: 3
    }
  ];

  activityLevelMeasure = [
    [{
      label: '1.3',
      value: 1.3
    },
    {
      label: '1.4',
      value: 1.4
    },
    {
      label: '1.5',
      value: 1.5
    },
    {
      label: '1.6',
      value: 1.6
    }],
    // 1
    [{
      label: '1.5',
      value: 1.5
    },
    {
      label: '1.6',
      value: 1.6
    },
    {
      label: '1.7',
      value: 1.7
    },
    {
      label: '1.8',
      value: 1.8
    }],
    // 2
    [{
      label: '1.7',
      value: 1.7
    },
    {
      label: '1.8',
      value: 1.8
    },
    {
      label: '1.9',
      value: 1.9
    },
    {
      label: '2.0',
      value: 2.0
    }],
    // 3
    [{
      label: '1.9',
      value: 1.9
    },
    {
      label: '2.0',
      value: 2.0
    },
    {
      label: '2.1',
      value: 2.1
    },
    {
      label: '2.2',
      value: 2.2
    }]
  ];

  corporalFatPercentageOptions = [...Array(51).keys()]
    .slice(4, 51)
    .map((value) => ({ label: `${value}%`, value}));
  
  dietGoalOptions = [
    {
      label: 'Pérdida de grasa',
      value: 'fat-loss'
    },
    {
      label: 'Ganancia de masa muscular',
      value: 'muscle-gain'
    },
  ];

  muscleGainDietGoalPaceOptions = [
    {
      label: 'Principiante: +1.5% de peso corporal/mes',
      value: 0.015
    },
    {
      label: 'Intermedio: +1.0% de peso corporal/mes',
      value: 0.01
    },
    {
      label: 'Avanzado: +0.5% de peso corporal/mes',
      value: 0.005
    }
  ];

  fatLossDietGoalPaceOptions = [
    {
      label: '-1.0% de pérdida de peso a la semana',
      value: 0.01
    },
    {
      label: '-0.7% de pérdida de peso a la semana',
      value: 0.0075
    },
    {
      label: '-0.5% de pérdida de peso a la semana',
      value: 0.005
    }
  ];

  loading$;

  constructor(private patientService: PatientsService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading$ = this.patientService.loading$;

    this.createPatientForm2.valueChanges.subscribe((value) => {
      const modifiedWeight = +value.weight * 2.20462;
      this.maintenanceCalories = Math.round(modifiedWeight * 10 * +value.activityLevelMeasure);
      if (value.dietGoal === 'muscle-gain') {
        this.targetCalories = Math.round(this.maintenanceCalories 
          + ((modifiedWeight * +value.dietGoalPace * 3500) / 4 / 7));
      } else {
        this.refeedTargetCalories = this.maintenanceCalories;
        this.targetCalories = Math.round(this.maintenanceCalories 
          - (3500 * modifiedWeight * +value.dietGoalPace) / (7 - +value.refeedsPerWeek));
        this.dietDeficit = Math.round(3500 * modifiedWeight * +value.dietGoalPace);
      }
    });

    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      this.isEdit = true;
      this.patientService.patients$.subscribe((patients: Patient[]) => {
        const patient = patients.find((patient) => patient.id === id);
        if (patient) {
          this.createPatientForm2.patchValue(patient);
        }
      });
    }
  }

  savePatient() {
    if (this.createPatientForm2.valid) {
      const patient = this.createPatientForm2.getRawValue();
      this.patientService.create(patient)
        .then(() => this.router.navigate(['patients']));
    }
  }

  updatePatient() {
    if (this.createPatientForm2.valid) {
      const patient = this.createPatientForm2.getRawValue();
      this.patientService.update(patient)
        .then(() => this.router.navigate(['patients']));
    }
  }

  hasErrors(inputName: string) {
    return this.createPatientForm2.get(inputName).errors;
  }
  
  getError(inputName: string, errorKey: string) {
    return this.createPatientForm2.get(inputName).errors &&
      this.createPatientForm2.get(inputName).errors[errorKey];
  }
}
