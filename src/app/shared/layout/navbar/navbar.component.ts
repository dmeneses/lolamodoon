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

  onLogoutClick() {
    this.logout.emit();
  }
}
