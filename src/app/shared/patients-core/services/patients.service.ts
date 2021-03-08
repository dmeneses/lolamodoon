import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { PatientsPage } from 'src/app/patients/patients-page';
import { Patient } from 'src/app/shared/models/patient';
import { PatientsPageStoreService } from './patients-page.store.service';
import { PatientsFirestoreService } from './patients.firestore.service';

@Injectable()
export class PatientsService {
  constructor(
    private firestore: PatientsFirestoreService,
    private store: PatientsPageStoreService
  ) {
    this.firestore.collection$().pipe(
      tap(patients => {
        this.store.patch({
          loading: false,
          patients,
          totalPatients: patients.length,
        }, `Patients collection subscription`)
      })
    ).subscribe()
  }

  get patients$(): Observable<Patient[]> {
    return this.store.state$.pipe(map(state => state.loading ? [] : state.patients))
  }

  get filter$() {
    return this.store.state$.pipe(map(state => state.filter));
  }
 
  get filteredPatients$(): Observable<Patient[]> {
    return combineLatest([
      this.patients$,
      this.filter$,
    ]).pipe(
      map(([patients, filter]) => {
        return patients.filter(patient => {
          return patient.name === filter.name
        })
      })
    )
  }

  get loading$(): Observable<boolean> {
    return this.store.state$.pipe(map(state => state.loading))
  }

  get noResults$(): Observable<boolean> {
    return this.store.state$.pipe(
      map(state => {
        return !state.loading && state.patients && state.patients.length === 0
      })
    )
  }

  get formStatus$(): Observable<string> {
    return this.store.state$.pipe(map(state => state.formStatus))
  }

  get totalPatients$(): Observable<number> {
    return this.store.state$.pipe(map(state => state.totalPatients))
  }

  getFilteredDietPatients(patientsIds: string[]): Observable<Patient[]> {
    return this.patients$.pipe(
      map((patients) => {
        return patients.filter(patient => {
          return patientsIds.includes(patient.id);
        })
      })
    )
  }

  create(patient: Patient) {
    this.store.patch({ loading: true, patients: [], formStatus: 'Saving...' }, "patient create")

    return this.firestore.create(patient).then(_ => {
      this.store.patch({ formStatus: 'Saved!' }, "patient create SUCCESS")
      setTimeout(() => this.store.patch({ formStatus: '' }, "patient create timeout reset formStatus"), 2000)
    }).catch(err => {
      this.store.patch({ loading: false, formStatus: 'An error ocurred' }, "patient create ERROR")
    })
  }

  update(patient: Patient) {
    this.store.patch({ loading: true, patients: [], formStatus: 'Updating...' }, "patient update")

    return this.firestore.update(patient.id, patient).then(_ => {
      this.store.patch({ formStatus: 'Saved!' }, "patient create SUCCESS")
      setTimeout(() => this.store.patch({ formStatus: '' }, "patient update timeout reset formStatus"), 2000)
    }).catch(err => {
      this.store.patch({ loading: false, formStatus: 'An error ocurred' }, "patient update ERROR")
    })
  }

  delete(id: string): Promise<void> {
    this.store.patch({ loading: true, patients: [] }, "patient delete")
    return this.firestore.delete(id)
      .catch(err => {
        this.store.patch({ loading: false, formStatus: 'An error ocurred' }, "patient delete ERROR")
      });
  }
}
