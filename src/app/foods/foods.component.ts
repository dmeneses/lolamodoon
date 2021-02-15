import { Component, OnInit } from '@angular/core';
import { SidebarMenu } from '../shared/models/sidebar-menu';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent implements OnInit {

  sidebarMenu: SidebarMenu = {
    items: [
      {
        title: 'Lista de Alimentos',
        iconName: 'format_list_bulleted',
        routerLink: '/foods',
      },
      {
        title: 'Agregar Alimento',
        iconName: 'person_add',
        routerLink: 'create',
      },
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
