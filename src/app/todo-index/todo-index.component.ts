import { Component, OnInit } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Observable } from 'rxjs';
import { ITodo } from '../models/ITodo';
import { ICreateTodo } from '../new-todo/new-todo.component';

@Component({
  selector: 'app-todo-index',
  templateUrl: './todo-index.component.html',
  styleUrls: ['./todo-index.component.scss'],
})
export class TodoIndexComponent implements OnInit {
  todos$: Observable<ITodo[]> = this.todosService.todos$;

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todosService.fetchTodos();
  }

  createTodo(request: ICreateTodo) {
    this.todosService.createTodo(request).subscribe(response => {
      console.log(response);
      this.todosService.fetchTodos();
    });
  }
}
