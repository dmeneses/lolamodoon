import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/shared/models/patient';
import { PatientMock } from 'src/app/shared/models/mocks/patient-mock';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-patient-selector',
  templateUrl: './patient-selector.component.html',
  styleUrls: ['./patient-selector.component.scss']
})
export class PatientSelectorComponent implements OnInit {
  patients: Patient[] = PatientMock;
  filteredPatients: Observable<Patient[]>;
  form = new FormGroup({
    patientId: new FormControl(''),
  });

  constructor(private bottomSheetRef: MatBottomSheetRef<PatientSelectorComponent>) { }

  ngOnInit(): void {
    this.filteredPatients = this.form.controls.patientId.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(value))
      );
  }

  showPatient(patientId: string) {
    if (patientId) {
      const {name} = this.patients.find(patient => patientId === patient.id);
      return `${name}`;
    }

    return '';
  }

  addPatient() {
    const { patientId } = this.form.getRawValue();
    const patient = this.patients.find(patient => patientId === patient.id)
    this.bottomSheetRef.dismiss(patient);
  }

  private filter(value: string): Patient[] {
    const filterValue = value.toLowerCase();
    return this.patients.filter(patient => patient.name.toLowerCase().includes(filterValue));
  }
}
