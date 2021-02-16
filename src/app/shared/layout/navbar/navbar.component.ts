import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  sections = {
    patients: {
      name: 'Pacientes',
    },
    foods: {
      name: 'Alimentos',
    },
    diets: {
      name: 'Dietas',
    }
  };

  sectionKeys = Object.keys(this.sections);

  constructor() { }

  ngOnInit(): void {
  }

}
