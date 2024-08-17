import { Component, Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { addTodo, loadTodos, removeTodo } from '../state/todos/todo.actions';
import { AppState } from '../state/app.state';
import { selectAllTodos } from '../state/todos/todo.selectors';

@Injectable({
    providedIn: 'root'
  })
  export class TodoService {
    todos$: Observable<Todo[]>;

    constructor(private store: Store<AppState>) {
      this.todos$ = this.store.pipe(select(selectAllTodos));
    }
  
    loadTodos(): void {
      this.store.dispatch(loadTodos());
    }
  
    addTodo(content: string): void {
      this.store.dispatch(addTodo({ content }));
    }
  
    removeTodo(id: string): void {
      this.store.dispatch(removeTodo({ id }));
    }
}
