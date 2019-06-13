import { Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { AdminGuard } from '../auth/guards/admin.guard';

export const routes: Routes = [
    {
        path: '',
        component: CourseComponent,
        children:[
            {
                path: 'list',
                component: CoursesListComponent
            },
            {
                path: 'add-course',
                component: CourseAddComponent,
                canLoad: [AdminGuard]
            },
            {
                path: 'add-course/:id',
                component: CourseAddComponent,
                canLoad: [AdminGuard]
            }
        ]
    }
];
