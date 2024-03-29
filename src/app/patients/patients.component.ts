import { Component, OnInit } from '@angular/core';

import { SidebarMenu } from '../shared/models/sidebar-menu';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  sidebarMenu: SidebarMenu = {
    items: [
      {
        title: 'Lista de Pacientes',
        iconName: 'format_list_bulleted',
        routerLink: '/patients',
      },
      {
        title: 'Agregar Paciente',
        iconName: 'person_add',
        routerLink: '/patients/create',
      },
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
