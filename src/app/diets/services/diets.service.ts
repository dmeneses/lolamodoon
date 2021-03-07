import { Injectable } from '@angular/core';
import { Observable, combineLatest, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Diet } from 'src/app/shared/models/diet';
import { DietFirestoreService } from './diet.firestore.service';
import { DietsPageStoreService } from './diets-page.store.service';

@Injectable()
export class DietsService {
  public test$ = new Subject();
  constructor(
    private firestore: DietFirestoreService,
    private store: DietsPageStoreService
  ) {
    this.firestore.collection$().pipe(
      tap(diets => {
        this.store.patch({
          loading: false,
          diets,
          totalDiets: diets.length,
        }, `Diets collection subscription`)
      })
    ).subscribe()
  }

  get diets$(): Observable<Diet[]> {
    return this.store.state$.pipe(map(state => state.loading ? [] : state.diets))
  }

  get filter$() {
    return this.store.state$.pipe(map(state => state.filter));
  }

  get filteredDiets$(): Observable<Diet[]> {
    return combineLatest([
      this.diets$,
      this.filter$,
    ]).pipe(
      map(([diets, filter]) => {
        return diets.filter(diet => {
          return diet.name === filter.name
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
        return !state.loading && state.diets && state.diets.length === 0
      })
    )
  }

  get formStatus$(): Observable<string> {
    return this.store.state$.pipe(map(state => state.formStatus))
  }

  get totalDiets$(): Observable<number> {
    return this.store.state$.pipe(map(state => state.totalDiets))
  }

  create(diet: Diet) {
    this.store.patch({ loading: true, diets: [], formStatus: 'Saving...' }, "diet create")
    diet.createdDate = new Date();
    diet.updatedDate = new Date();
    return this.firestore.create(diet).then(_ => {
      this.store.patch({ formStatus: 'Saved!' }, "diet create SUCCESS")
      setTimeout(() => this.store.patch({ formStatus: '' }, "diet create timeout reset formStatus"), 2000)
    }).catch(err => {
      this.store.patch({ loading: false, formStatus: 'An error ocurred' }, "diet create ERROR")
    })
  }

  update(diet: Diet) {
    this.store.patch({ loading: true, diets: [], formStatus: 'Updating...' }, "diet update")
    diet.updatedDate = new Date();
    return this.firestore.update(diet.id, diet).then(_ => {
      this.store.patch({ formStatus: 'Saved!' }, "diet create SUCCESS")
      setTimeout(() => this.store.patch({ formStatus: '' }, "diet update timeout reset formStatus"), 2000)
    }).catch(err => {
      this.store.patch({ loading: false, formStatus: 'An error ocurred' }, "diet update ERROR")
    })
  }

  delete(id: string): Promise<void> {
    this.store.patch({ loading: true, diets: [] }, "diet delete")
    return this.firestore.delete(id)
      .catch(err => {
        this.store.patch({ loading: false, formStatus: 'An error ocurred' }, "diet delete ERROR")
      });
  }
}
