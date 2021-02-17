import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodSelectorComponent } from './food-selector.component';

describe('FoodSelectorComponent', () => {
  let component: FoodSelectorComponent;
  let fixture: ComponentFixture<FoodSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
