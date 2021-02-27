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

  createPatientForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    birthDate: new FormControl(new Date()),
    targetCalories: new FormControl(0),
    basalMetabolism: new FormControl(0),
    estimatedDailyEnergyExpenditure:  new FormControl(0),
  });

  isEdit = false;
  loading$;

  constructor(private patientService: PatientsService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading$ = this.patientService.loading$;

    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      this.isEdit = true;
      this.patientService.patients$.subscribe((patients: Patient[]) => {
        const patient = patients.find((patient) => patient.id === id);
        if (patient) {
          this.createPatientForm.patchValue({...patient, birthDate: (patient.birthDate as any).toDate()});
        }
      });
    }
  }

  savePatient() {
    if (this.createPatientForm.valid) {
      const patient = this.createPatientForm.getRawValue();
      this.patientService.create(patient)
        .then(() => this.router.navigate(['patients']));
    }
  }

  updatePatient() {
    if (this.createPatientForm.valid) {
      const patient = this.createPatientForm.getRawValue();
      this.patientService.update(patient)
        .then(() => this.router.navigate(['patients']));
    }
  }
}
