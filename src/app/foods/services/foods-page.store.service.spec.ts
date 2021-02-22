import { TestBed } from '@angular/core/testing';

import { FoodsPage.StoreService } from './foods-page.store.service';

describe('FoodsPage.StoreService', () => {
  let service: FoodsPage.StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodsPage.StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
