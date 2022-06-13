import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements DoCheck {

  isAdmin: boolean = false;
  constructor(private authService: AuthService, private route: Router) { }


  ngDoCheck(): void {
    this.authService.verifyAutentication().subscribe(res => {
      this.isAdmin = res;
    })
  }

  logout() {
    this.authService.logout();
    this.isAdmin = false;
    this.route.navigate(['']);
  }

}
