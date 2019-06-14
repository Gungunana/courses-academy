import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoursesService } from '../courses.service';
import AuthService from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import CourseInterface from '../models/course.model';
import AssignedUserInterface from '../models/assignedUser.model';
import UserScoreInterface from '../models/user.score.model';
import UserInterface from 'src/app/users/models/user.model';

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
  loggedUserScore: number[];
  rest: number[];
  loggedUserScoreLen: number;
  selectedScore: number;
  loggedUser: UserInterface

  constructor(private coursesService: CoursesService,
              private authService: AuthService,
              private router: Router) { 

                this.isLoggedIn = this.authService.isLoggedIn();
                this.isAdmin = this.authService.isAdmin();
                this.loggedUser = this.authService.getLoggedUser();
              }

  ngOnInit() {

    if(this.course.userScores && this.loggedUser){

      var asd = this.course.userScores.find(x => x.userId == this.loggedUser.id);

      if(asd){
        var result = asd.rating;
        this.loggedUserScore = Array(result).fill(1)
        this.rest = Array(5 - result).fill(1)
        this.loggedUserScoreLen = this.loggedUserScore.length
      }

      if(!this.rest){
        this.rest = Array(5).fill(1)
        this.loggedUserScoreLen = 0
      }
    }
  }

  onDeleteClick(): void {
    this.onDelete.emit(this.course.id);
  }

  onEditClick(): void {
    this.router.navigate(['courses/add-course', this.course.id]);
  }

  onRateClick(rating: number): void {
    var score = this.course.userScores.find(x => x.userId = this.loggedUser.id)

    if(!score){
      var score: UserScoreInterface = {
        userId: this.loggedUser.id,
        rating: rating
      }
      this.course.userScores.push(score)
    }
    score.rating = rating

    console.log(score.rating)
    
    this.coursesService.add(this.course).subscribe(() => {
      this.router.navigateByUrl('courses/list');
    })
  }

  onJoinClick() {
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
