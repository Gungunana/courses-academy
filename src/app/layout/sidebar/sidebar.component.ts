import { Component, OnInit } from '@angular/core';
import AuthService from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(private authService: AuthService) { 
    this.isLoggedIn = authService.isLoggedIn();
    this.isAdmin = authService.isAdmin();
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
