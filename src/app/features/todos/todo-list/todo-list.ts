import { Component, signal, computed } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  imports: [TodoItem],
  selector: 'app-todo-list',
  styleUrl: './todo-list.scss',
  templateUrl: './todo-list.html',
})
export class TodoList {
  protected readonly todos = signal<Todo[]>([
    { id: 1, title: 'Learn Angular', done: false },
    { id: 2, title: 'Build an app', done: true },
    { id: 3, title: 'Deploy to production', done: true },
  ]);

  protected readonly doneCount = computed(() => this.todos().filter((todo) => todo.done).length);

  protected readonly isFull = computed(() => this.todos().length >= 5);

  protected addSample() {
    this.todos.update((list) => {
      return [...list, { id: list.length + 1, title: 'New Todo', done: false }];
    });
  }

  protected onTodoToggled(id: number) {
    this.todos.update((list) => {
      return list.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo));
    })
  }
}
