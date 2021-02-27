import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Food } from 'src/app/shared/models/food';
import { FoodFirestoreService } from './food.firestore.service';
import { FoodsPageStoreService } from './foods-page.store.service';

@Injectable()
export class FoodsService {

  constructor(
    private firestore: FoodFirestoreService,
    private store: FoodsPageStoreService
  ) {
    console.log('foodsservice')
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

  get filteredFoods$(): Observable<Food[]> {
    return combineLatest([
      this.foods$,
      this.filter$,
    ]).pipe(
      map(([foods, filter]) => {
        return foods.filter(food => {
          return food.name === filter.name
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

  create(food: Food) {
    this.store.patch({ loading: true, foods: [], formStatus: 'Saving...' }, "food create")

    return this.firestore.create(food).then(_ => {
      this.store.patch({ formStatus: 'Saved!' }, "food create SUCCESS")
      setTimeout(() => this.store.patch({ formStatus: '' }, "food create timeout reset formStatus"), 2000)
    }).catch(err => {
      this.store.patch({ loading: false, formStatus: 'An error ocurred' }, "food create ERROR")
    })
  }

  update(food: Food) {
    this.store.patch({ loading: true, foods: [], formStatus: 'Updating...' }, "food update")

    return this.firestore.update(food.id, food).then(_ => {
      this.store.patch({ formStatus: 'Saved!' }, "food create SUCCESS")
      setTimeout(() => this.store.patch({ formStatus: '' }, "food update timeout reset formStatus"), 2000)
    }).catch(err => {
      this.store.patch({ loading: false, formStatus: 'An error ocurred' }, "food update ERROR")
    })
  }

  delete(id: string): Promise<void> {
    this.store.patch({ loading: true, foods: [] }, "food delete")
    return this.firestore.delete(id)
      .catch(err => {
        this.store.patch({ loading: false, formStatus: 'An error ocurred' }, "food delete ERROR")
      });
  }
}
