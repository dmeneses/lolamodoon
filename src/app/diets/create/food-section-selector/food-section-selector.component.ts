import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-food-section-selector',
  templateUrl: './food-section-selector.component.html',
  styleUrls: ['./food-section-selector.component.scss']
})
export class FoodSectionSelectorComponent implements OnInit {

  form = new FormGroup({
    sectionName: new FormControl(''),
  });

  constructor(private bottomSheetRef: MatBottomSheetRef<FoodSectionSelectorComponent>) { }

  ngOnInit(): void {
  }

  addSection() {
    const { sectionName } = this.form.getRawValue();
    this.bottomSheetRef.dismiss(sectionName);
  }

}
