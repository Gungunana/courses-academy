import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoursesService } from '../courses.service';
import AuthService from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import CourseInterface from '../models/course.model';
import AssignedUserInterface from '../models/assignedUser.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

  @Input() course: CourseInterface;
  @Output() onDelete = new EventEmitter();

  isLoggedIn: boolean = false;
  isAdmin: boolean;

  constructor(private coursesService: CoursesService,
              private authService: AuthService,
              private router: Router) { 

                this.isLoggedIn = this.authService.isLoggedIn();
                this.isAdmin = this.authService.isAdmin();
              }

  ngOnInit() {
  }

  onDeleteClick(): void {
    this.onDelete.emit(this.course.id);
  }

  onEditClick(): void {
    this.router.navigate(['courses/add-course', this.course.id]);
  }

  onJoinClick() {
    // console.log(sessionStorage)
    // console.log(this.course)
    var loggedUser = this.authService.getLoggedUser();

    if (this.course.assignedUsers.findIndex(u => u.id === loggedUser.id) !== -1) 
      return;
    
      const assignee: AssignedUserInterface = {
        name: loggedUser.name,
        id: loggedUser.id
      };
        
      this.course.assignedUsers.push(assignee);

      this.coursesService.joinCourse(this.course).subscribe(() => {
    });
  }

  get canJoin(): boolean {
    const user = this.authService.getLoggedUser();
 
    if(!user) 
     return false;
 
     const userId = user.id;
 
     return this.course.assignedUsers.findIndex(u => u.id === userId) === -1;
   }
}
