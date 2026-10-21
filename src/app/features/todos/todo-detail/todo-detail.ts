import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-todo-detail',
  styleUrl: './todo-detail.scss',
  templateUrl: './todo-detail.html',
})
export class TodoDetail {
  readonly id = input.required<string>();
}
