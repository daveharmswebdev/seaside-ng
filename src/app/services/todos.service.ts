import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITodo } from '../models/ITodo';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICreateTodo } from '../new-todo/new-todo.component';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private readonly baseUrl = 'https://localhost:7261/Todo';
  private _todos = new BehaviorSubject<ITodo[]>([]);
  todos$ = this._todos.asObservable();

  constructor(private http: HttpClient) {}

  fetchTodos() {
    this.http
      .get<ITodo[]>(this.baseUrl)
      .subscribe(todos => this._todos.next(todos));
  }

  createTodo(request: ICreateTodo) {
    return this.http.post(this.baseUrl, request);
  }

  getPublic(): Observable<{ date: string }> {
    return this.http.get<{ date: string }>('http://localhost:5275/Public');
  }

  getProtected(): Observable<{ name: string }> {
    return this.http.get<{ name: string }>('http://localhost:5275/Hello');
  }
}
