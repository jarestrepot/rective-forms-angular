import { Component } from '@angular/core';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [
  ]
})
export class SideMenuComponent {
  public reactiveMenu: MenuItem[] = [
    {
      title: 'Basic',
      route: './reactive/basic'
    },
    {
      title: 'Dynamics',
      route: './reactive/dynamic'
    },
    {
      title: 'Swtches',
      route: './reactive/switches'
    }
  ];

  public authMenu: MenuItem[] = [
    {
      title: 'Register',
      route: './auth'
    }
  ];

}
