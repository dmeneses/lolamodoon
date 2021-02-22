import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Food } from 'src/app/shared/models/food';
import { FoodFirestoreService } from './food.firestore.service';
import { FoodsPageStoreService } from './foods-page.store.service';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {

  constructor(
    private firestore: FoodFirestoreService,
    private store: FoodsPageStoreService
  ) {
    this.firestore.collection$().pipe(
      tap(foods => {
        this.store.patch({
          loading: false,
          foods,
          totalFoods: foods.length,
        }, `Foods collection subscription`)
      })
    ).subscribe()
  }

  get foods$(): Observable<Food[]> {
    return this.store.state$.pipe(map(state => state.loading ? [] : state.foods))
  }

  get filter$() {
    return this.store.state$.pipe(map(state => state.filter));
  }

  get fileredFoods$(): Observable<Food[]> {
    return combineLatest([
      this.foods$,
      this.filter$,
    ]).pipe(
      map(([foods, filter]) => {
        return foods.filter(employee => {
          return employee.name === filter.name
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
        return !state.loading && state.foods && state.foods.length === 0
      })
    )
  }

  get formStatus$(): Observable<string> {
    return this.store.state$.pipe(map(state => state.formStatus))
  }

  get totalFoods$(): Observable<number> {
    return this.store.state$.pipe(map(state => state.totalFoods))
  }

  create(employee: Food) {
    this.store.patch({ loading: true, foods: [], formStatus: 'Saving...' }, "employee create")
    return this.firestore.create(employee).then(_ => {
      this.store.patch({ formStatus: 'Saved!' }, "employee create SUCCESS")
      setTimeout(() => this.store.patch({ formStatus: '' }, "employee create timeout reset formStatus"), 2000)
    }).catch(err => {
      this.store.patch({ loading: false, formStatus: 'An error ocurred' }, "employee create ERROR")
    })
  }

  delete(id: string): any {
    this.store.patch({ loading: true, foods: [] }, "employee delete")
    return this.firestore.delete(id).catch(err => {
      this.store.patch({ loading: false, formStatus: 'An error ocurred' }, "employee delete ERROR")
    })
  }
}
