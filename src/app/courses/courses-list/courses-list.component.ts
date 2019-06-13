import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import CourseInterface from '../models/course.model';
import { Router } from '@angular/router';
import AuthService from 'src/app/auth/auth.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  courses: CourseInterface[] = [];
  isAdmin: boolean

  constructor(private coursesService: CoursesService,
              private router: Router,
              private authService: AuthService) { 
    this.isAdmin = authService.isAdmin()
  }

  ngOnInit() {
    this.coursesService.getAll().subscribe((courses) => {
      this.courses = courses;
    });
  }

  onCourseDeleted(id: number): void {
    this.coursesService.delete(id).subscribe(() => {
      this.courses = this.courses.filter(t => t.id !== id);
    });
  }

  onCourseAdd(): void {
    this.router.navigateByUrl('courses/add-course');
  }

}
