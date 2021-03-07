import { TestBed } from '@angular/core/testing';

import { FoodsPageStoreService } from './foods-page.store.service';

describe('FoodsPage.StoreService', () => {
  let service: FoodsPage.StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodsPageStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
