import { Component } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Observable } from 'rxjs';
import { ITodo } from '../models/ITodo';

@Component({
  selector: 'app-todo-index',
  templateUrl: './todo-index.component.html',
  styleUrls: ['./todo-index.component.scss'],
})
export class TodoIndexComponent {
  todos$: Observable<ITodo[]> = this.todosService.getTodos();

  constructor(private todosService: TodosService) {}
}
