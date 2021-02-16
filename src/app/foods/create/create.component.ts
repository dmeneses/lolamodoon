import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createFoodForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    protein: new FormControl(0, [Validators.required]),
    carbohydrate: new FormControl(0, [Validators.required]),
    fat: new FormControl(0, [Validators.required]),
    fiber: new FormControl(0, [Validators.required]),
    servingSize: new FormControl({value: 100, disabled: true}),
    servingSizeUnit: new FormControl({value: 'grams', disabled: true}),
  });

  constructor() { }

  ngOnInit(): void {
  }

  submit() {

  }

}
