import { Component, Input, OnInit } from '@angular/core';
import { SidebarMenu } from '../../models/sidebar-menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() sidebarMenu: SidebarMenu =  { items: [] };
  
  constructor() { }

  ngOnInit(): void {
  }

}
