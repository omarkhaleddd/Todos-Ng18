import { createReducer, on } from '@ngrx/store';
import { Todo } from "../../todo/todo.model";
import { addTodo, loadTodos, loadTodosFailure, loadTodosSuccess, removeTodo } from './todo.actions';

export enum StatusName {
    'pending', 'loading' , 'error' , 'success'
}

export interface TodoState {
    todos: Todo[];
    error:string;
    status: StatusName;
}

export const initialState : TodoState = {
    todos: [],
    error: '',
    status: StatusName.pending
}

export const todoReducer = createReducer(
    initialState,
    on(addTodo,(state, {content}) =>({
        ...state,
        todos : [...state.todos , { id: Date.now().toString(),content:content}]
    })),
    on(removeTodo , (state , { id }) =>({
        ...state ,
        todos: state.todos.filter(todo => todo.id !== id)
    })),
    on(loadTodos , (state) =>({
        ...state,
        status: StatusName.loading
    })),
    on(loadTodosSuccess,(state , {todos}) => ({
        ...state,
        todos: todos,
        error:'',
        status: StatusName.success
    })),
    on(loadTodosFailure, (state , { error }) =>({
        ...state ,
        error : error,
        status: StatusName.error
    }))
);
