import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() logout = new EventEmitter<void>();
  @Input() displayMenus: boolean = false;

  sections = {
    // TODO: Enable view when database connection is set 
    // patients: {
    //   name: 'Pacientes',
    // },
    foods: {
      name: 'Alimentos',
    },
    // TODO: Enable view when database connection is set 
    // diets: {
    //   name: 'Dietas',
    // }
  };

  sectionKeys = Object.keys(this.sections);

  constructor() { }

  ngOnInit(): void {
  }

  onLogoutClick() {
    this.logout.emit();
  }
}
