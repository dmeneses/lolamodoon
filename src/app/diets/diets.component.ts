import { Component, OnInit } from '@angular/core';
import { SidebarMenu } from '../shared/models/sidebar-menu';

@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.scss']
})
export class DietsComponent implements OnInit {

  sidebarMenu: SidebarMenu = {
    items: [
      {
        title: 'Lista de Dietas',
        iconName: 'format_list_bulleted',
        routerLink: '/diets',
      },
      {
        title: 'Crear Dieta',
        iconName: 'dinner_dining',
        routerLink: '/diets/create',
      },
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
