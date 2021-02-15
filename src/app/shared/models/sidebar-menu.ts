export interface SidebarMenu {
  items: SidebarItem[];
}

export interface SidebarItem {
  title: string;
  iconName: string;
  routerLink: string;
}
