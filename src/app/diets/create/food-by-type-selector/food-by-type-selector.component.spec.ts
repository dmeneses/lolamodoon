import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodByTypeSelectorComponent } from './food-by-type-selector.component';

describe('FoodByTypeSelectorComponent', () => {
  let component: FoodByTypeSelectorComponent;
  let fixture: ComponentFixture<FoodByTypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodByTypeSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodByTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
