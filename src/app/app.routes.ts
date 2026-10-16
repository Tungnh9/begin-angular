import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { TodoList } from './features/todos/todo-list/todo-list';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'todos', component: TodoList },
];
