import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITodo } from '../models/ITodo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<ITodo[]>('https://localhost:7261/Todo');
  }

  getPublic(): Observable<{ date: string }> {
    return this.http.get<{ date: string }>('http://localhost:5275/Public');
  }

  getProtected(): Observable<{ name: string }> {
    return this.http.get<{ name: string }>('http://localhost:5275/Hello');
  }
}
