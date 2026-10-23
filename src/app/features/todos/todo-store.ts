import { Service, signal } from '@angular/core';
import { Todo } from './todo.model';

@Service()
export class TodoStore {
  private nextId = 4;

  readonly todos = signal<Todo[]>([
    { id: 1, title: 'Learn Angular', done: false },
    { id: 2, title: 'Build an app', done: true },
    { id: 3, title: 'Deploy to production', done: true },
  ]);

  add(title: string) {
    this.todos.update((list) => {
      return [...list, { id: this.nextId++, title: title, done: false }];
    });
  }

  toggle(id: number) {
    this.todos.update((list) => {
      return list.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo));
    });
  }

  remove(id: number) {
    this.todos.update((list) => {
      return list.filter((todo) => todo.id !== id);
    });
  }
}
