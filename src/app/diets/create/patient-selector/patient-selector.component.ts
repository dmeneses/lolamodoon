import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Patient } from 'src/app/shared/models/patient';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { PatientsService } from 'src/app/shared/patients-core/services/patients.service';

@Component({
  selector: 'app-patient-selector',
  templateUrl: './patient-selector.component.html',
  styleUrls: ['./patient-selector.component.scss']
})
export class PatientSelectorComponent implements OnInit, OnDestroy {
  filteredPatients: Patient[] = []; 
  form = new FormGroup({
    patient: new FormControl(null, Validators.required),
  });
  availablePatients$: Observable<Patient[]>;
  unsubscribe$ = new Subject()

  constructor(private bottomSheetRef: MatBottomSheetRef<PatientSelectorComponent>,
    private patientsService: PatientsService,
    private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.availablePatients$ = this.patientsService.patients$;

    combineLatest([
      this.form.controls.patient.valueChanges,
      this.availablePatients$
    ]).pipe(
      takeUntil(this.unsubscribe$),
      map(([patientName, patients]) => typeof patientName === 'string' ?
        patients.filter(patient => patient.name.toLowerCase().includes(patientName.toLowerCase())) : []
      )
    ).subscribe((results) => {
      this.filteredPatients = results;
      this.ref.detectChanges();
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  showPatient(patient: Patient) {
    if (patient) {
      return `${patient.name}`;
    }

    return '';
  }

  addPatient() {
    if (this.form.invalid) {
      return;
    }

    const { patient } = this.form.getRawValue();
    this.bottomSheetRef.dismiss(patient);
  }
}
