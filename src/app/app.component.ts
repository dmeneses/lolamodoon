import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lolamodoon';
  displayMenus$ = this.authService.isUserAuthenticated()

  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout()
      .then(() => {})
      .catch((error) => console.error(error))
      .finally(() => this.router.navigate(['login']))
  }
}
