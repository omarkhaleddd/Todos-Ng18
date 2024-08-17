import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { AppState } from '../state/app.state';
import { selectAllTodos } from '../state/todos/todo.selectors';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]>;  // Observable of todos from the store
  newTodo: string = '';
  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.todos$;  // Fetch todos from the service
  }

  ngOnInit() {
    this.todoService.loadTodos();  // Load todos when component initializes
  }
  addTodo() {
    if (this.newTodo.trim()) {
      this.todoService.addTodo(this.newTodo);
      this.newTodo = ''; // Clear the input field
    }
  }

  removeTodo(id: string) {
    this.todoService.removeTodo(id);  // Dispatch action to remove a todo
  }

  trackById(index: number, todo: Todo): string {
    return todo.id;  // Track todos by their unique id
  }
}
