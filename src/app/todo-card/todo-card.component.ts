import { Component, Input } from '@angular/core';
import { ITodo } from '../models/ITodo';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent {
  @Input() todo!: ITodo;
}
