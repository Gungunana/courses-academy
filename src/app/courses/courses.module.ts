import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseComponent } from './course/course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseAddComponent } from './course-add/course-add.component';


@NgModule({
  declarations: [CourseComponent, CoursesListComponent, CourseCardComponent, CourseAddComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CoursesModule { }
