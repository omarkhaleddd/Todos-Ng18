// import { Injectable } from '@angular/core';
// import { Todo } from './todo.model';


// @Injectable({
//   providedIn: 'root'
// })
// export class TodoService {
//   private storageKey = 'todos';

//   getTodos(): Promise<Todo[]> {
//     const todos = localStorage.getItem(this.storageKey);
//     return todos ? JSON.parse(todos) : [];
//   }

//   saveTodos(todos: Todo[]): Promise<void> {
//     return new Promise((resolve, reject) => {
//       try {
//         localStorage.setItem(this.storageKey, JSON.stringify(todos));
//         resolve(); // Resolve the promise when saving is successful
//       } catch (error) {
//         reject(error); // Reject the promise if an error occurs
//       }
//     });
//   }
  
// }
