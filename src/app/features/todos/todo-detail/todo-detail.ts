import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodoStore } from '../todo-store';

@Component({
  imports: [RouterLink],
  selector: 'app-todo-detail',
  styleUrl: './todo-detail.scss',
  templateUrl: './todo-detail.html',
})
export class TodoDetail {
  private readonly store = inject(TodoStore);

  readonly id = input.required<string>();

  protected readonly todo = computed(() =>
    this.store.todos().find((todo) => todo.id === Number(this.id())),
  );
}
