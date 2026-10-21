import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { TodoList } from './features/todos/todo-list/todo-list';
import { TodoDetail } from './features/todos/todo-detail/todo-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'todos', component: TodoList },
  { path: 'todos/:id', component: TodoDetail },
];
