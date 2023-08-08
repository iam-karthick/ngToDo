import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Todo, User } from '../Store/todo';
import { TodoState } from '../Store/todo.state';
import { DeleteTodo, ToggleTodo,updateTodo } from '../Store/todo.action';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @Select(TodoState.numUncheckedTodos)
  uncheckedTodos!: Observable<number>;

  @Select(TodoState.todos)
  todos!: Observable<Todo[]>;

  @Select(TodoState.userDetails)
  userDetails!: Observable<User[]>;

  submitTodos = false;
  status = 'ONLINE';
  isConnected: any;

  constructor(
    private store: Store,
    private connectionService: ConnectionService
  ) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
        this.checkTodo()
      }
    })
  }

  checkTodo() {
    let value = false;
    return this.todos.subscribe(res => {
      console.log(res)
      if (res.length > 0) {
        this.submitTodos = true
      } else {
        this.submitTodos = false
      }
    })
  }

  toggleTodo(todo: Todo) {
    // this.todos
    console.log(todo)
    this.store.dispatch(new ToggleTodo(todo));
  }

  deleteTodo(todo: Todo) {
    this.store.dispatch(new DeleteTodo(todo));
  }

  onSubmit() {
    this.todos.subscribe(res => {
    console.log(res)
    // this.store.dispatch(new updateTodo(res));
    })

  }

}
