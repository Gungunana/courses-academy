import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import CourseInterface from './models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

    private url = "http://localhost:3000/courses"
    constructor(private http: HttpClient) { }

    add(course: CourseInterface): Observable<any> {
    if (course.id) {
        return this.http.put(`${this.url}/${course.id}`, course)
    }
    return this.http.post(`${this.url}`, course)
    }

    public getAll(): Observable<CourseInterface[]> {
        return this.http.get<CourseInterface[]>(`${this.url}`);
    }

    public getById(id: number): Observable<CourseInterface> {
        return this.http.get<CourseInterface>(`${this.url}/${id}`);
    }

    public joinCourse(course: CourseInterface): Observable<any> {
        return this.http.put(`${this.url}/${course.id}`, course);
    }

    public delete(id: number): Observable<any> {
        return this.http.delete(`${this.url}/${id}`);
    }
}
