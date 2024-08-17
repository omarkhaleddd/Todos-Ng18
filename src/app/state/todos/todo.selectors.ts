import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { TodoState } from "./todo.reducer";


export const selectTodoState = createFeatureSelector<AppState, TodoState>('todos');

// Selector to select all todos
export const selectAllTodos = createSelector(
  selectTodoState,
  (todoState: TodoState) => todoState.todos
);