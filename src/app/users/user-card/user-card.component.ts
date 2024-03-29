import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import UserInterface from '../models/user.model';
import { Router } from '@angular/router';
import AuthService from '../../auth/auth.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: UserInterface;
  @Output() onDelete: EventEmitter<number> = new EventEmitter();

  isAdmin: boolean = false;
  @Input() currentUserId: number;
  constructor(private router: Router,
    private authService: AuthService) { 
      this.isAdmin = authService.isAdmin();
  }

  ngOnInit() {
  }

  onDeleteClicked() {
    this.onDelete.emit(this.user.id);
  }

  onUserEdit() {
    this.router.navigate(['users/add', this.user.id]);
  }
}
