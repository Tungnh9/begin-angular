import { Component, computed, inject } from '@angular/core';
import { TodoItem } from '../todo-item/todo-item';
import { TodoStore } from '../todo-store';

@Component({
  imports: [TodoItem],
  selector: 'app-todo-list',
  styleUrl: './todo-list.scss',
  templateUrl: './todo-list.html',
})
export class TodoList {
  private readonly store = inject(TodoStore);

  protected readonly todos = this.store.todos;

  protected readonly doneCount = computed(() => this.todos().filter((todo) => todo.done).length);

  protected readonly isFull = computed(() => this.todos().length >= 5);

  protected addSample() {
    this.store.add(`New Todo`);
  }

  protected onTodoToggled(id: number) {
    this.store.toggle(id);
  }

  protected onTodoDeleted(id: number) {
    this.store.remove(id);
  }
}
