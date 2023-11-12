import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export interface ICreateTodo {
  name: string;
  complete: boolean;
}

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss'],
})
export class NewTodoComponent {
  form = this.fb.group({
    name: ['', Validators.required],
  });

  @Output() createTodo = new EventEmitter<ICreateTodo>();

  constructor(private fb: FormBuilder) {}

  handleCreateTodo() {
    const request: ICreateTodo = {
      name: this.form.get('name')?.value || 'no name',
      complete: false,
    };
    this.createTodo.emit(request);
  }
}
