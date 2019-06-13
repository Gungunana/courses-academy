import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { CoursesService } from '../courses.service';
import CourseInterface from '../models/course.model';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

  courseForm: FormGroup;
  constructor(private fb: FormBuilder,
              private coursesService: CoursesService,
              private router: Router,
              private route: ActivatedRoute) { 

                this.route.params.subscribe((params) => {
            
                  if (params.id) {
                    this.coursesService.getById(params.id)
                    .subscribe((course) => {
                      this.createForm();
            
                      this.courseForm.patchValue({...course});
                    });
                  }
                });
                this.createForm();
              }

  ngOnInit() {
  }

  private createForm(): void {
    this.courseForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(5)]],
      assignedUsers: ['']
    });
  }

  onFormSubmit(event): void {
    const course = { ...this.courseForm.value} as CourseInterface;
    course.assignedUsers = course.assignedUsers || [];
    this.coursesService.add(course)
    .subscribe(() => {
      this.router.navigateByUrl('courses/list');
    })
  }

  get isFormValid(): boolean {
    return this.courseForm.valid;
  }

  get title() {
    return this.courseForm.get('title');
  }

  get description() {
    return this.courseForm.get('description');
  }
}