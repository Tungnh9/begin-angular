import { Component, input, output } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  imports: [],
  selector: 'app-todo-item',
  styleUrl: './todo-item.scss',
  templateUrl: './todo-item.html',
})
export class TodoItem {
  readonly todo = input.required<Todo>();
  readonly toggled = output<number>();
}
