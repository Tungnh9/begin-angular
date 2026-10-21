import { Component, input, output } from '@angular/core';
import { Todo } from '../todo.model';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-todo-item',
  styleUrl: './todo-item.scss',
  templateUrl: './todo-item.html',
})
export class TodoItem {
  readonly todo = input.required<Todo>();

  readonly toggled = output<number>();
  readonly deleted = output<number>();
}
