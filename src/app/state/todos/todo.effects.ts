import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { TodoService } from '../../todo/todo.service';
import { loadTodos, loadTodosSuccess, loadTodosFailure, addTodo, removeTodo } from './todo.actions';
import { AppState } from '../app.state';
import { selectAllTodos } from './todo.selectors';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private todoService: TodoService
  ) {}

  // Effect to load todos (This effect is optional if using localStorage sync)
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        of([]).pipe( // Using 'of([])' since the localStorageSync already hydrates the state
          map(() => {
            // Since the state is already synced with localStorage, we return the current state
            const todos = this.store.select(selectAllTodos);
            return loadTodosSuccess({ todos: [] }); // This will not actually dispatch anything useful but keeps the flow
          }),
          catchError((error) => of(loadTodosFailure({ error: error.message })))
        )
      )
    )
  );

  // Effect to save todos whenever addTodo or removeTodo is dispatched
  saveTodos$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addTodo, removeTodo),
        withLatestFrom(this.store.select(selectAllTodos)),
        switchMap(([action, todos]) =>
          of(null).pipe( // No need to perform any side effects since state is auto-synced
            catchError((error) => {
              console.error('Failed to save todos:', error);
              return of(); // Handle the error appropriately if needed
            })
          )
        )
      ),
    { dispatch: false } // No dispatch since this effect just syncs state with localStorage via the meta-reducer
  );
}
