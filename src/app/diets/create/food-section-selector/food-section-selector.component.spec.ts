import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodSectionSelectorComponent } from './food-section-selector.component';

describe('FoodSectionSelectorComponent', () => {
  let component: FoodSectionSelectorComponent;
  let fixture: ComponentFixture<FoodSectionSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodSectionSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodSectionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
