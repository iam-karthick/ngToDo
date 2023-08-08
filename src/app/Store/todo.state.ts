import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Todo, User } from './todo';
import { CreateTodo, DeleteTodo, ToggleTodo, ToggleAllTodos, ToggleUser, GetUsers, updateTodo } from './todo.action';
import { tap, catchError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoService } from '../Store/todo.action.service'

interface UserStateModel {
  userInfo: User[];
}

interface TodoStateModel {
  todos: Todo[]
}

const userDetail: User[] = [{
  userName: "",
  validUser: false,
  submit: false
}]


const todosDetail: Todo[] = [

];

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    todos: todosDetail
  }
})

@State<UserStateModel>({
  name: 'user',
  defaults: {
    userInfo: userDetail
  }
})

@Injectable()
export class TodoState {
  constructor(private http: HttpClient, private todoService: TodoService) {
  }

  @Selector()
  static userDetails(state: UserStateModel): User[] {
    return state.userInfo;
  }

  @Selector()
  static todos(state: TodoStateModel): Todo[] {
    return state.todos;
  }

  @Selector()
  static numUncheckedTodos(state: TodoStateModel): number {
    return state.todos.filter(todo => !todo.done).length;
  }

  @Action(CreateTodo)
  createTodo(ctx: StateContext<TodoStateModel>, action: CreateTodo) {
    const todo = { description: action.description, done: false };
    ctx.patchState({
      todos: [...ctx.getState().todos]
    });
  }

  @Action(DeleteTodo)
  deleteTodo(ctx: StateContext<TodoStateModel>, action: DeleteTodo) {
    const { todos } = ctx.getState();
    ctx.patchState({
      todos: todos.filter(todo => todo !== action.payload)
    });
  }

  @Action(ToggleTodo)
  toggleTodo(ctx: StateContext<TodoStateModel>, action: ToggleTodo) {
    const todo = action.payload;
    todo.done = !todo.done;
    ctx.patchState({
      todos: [...ctx.getState().todos]
    })
  }

  @Action(ToggleAllTodos)
  toggleAllTodos(ctx: StateContext<TodoStateModel>, action: ToggleTodo) {
    const { todos } = ctx.getState();
    const allDone = todos.every(todo => todo.done);
    todos.forEach(todo => todo.done = !allDone);
    ctx.patchState({
      todos: [...todos]
    })
  }

  //---------Create User-----------//


  @Action(CreateTodo)
  createUser(ctx: StateContext<TodoStateModel>, action: CreateTodo) {
    const todo = { description: action.description, done: false };
    ctx.patchState({
      todos: [todo, ...ctx.getState().todos]
    });
  }


  //-------User Status---------//

  baseUrl = "https://f44ca9d6-8360-48f9-b551-8a8e086915bd.mock.pstmn.io/"
  @Action(GetUsers)
  getDataFromState(ctx: StateContext<TodoStateModel>, action: GetUsers) {
    let name: string = action.payload.userName;
    return this.todoService.fetchTodos(name).pipe(tap((res) => {
      ctx.patchState({
        todos: res.todoLists
      })
    }), catchError(error => {
      ctx.patchState({
        todos: []
      })
      if (error.error instanceof ErrorEvent) {
        alert(`Error:user does not exist`);
        console.log(`${error.error.message}`)
      } else {
        alert(`Error:user does not exist`);
        console.log(`${error.message}`)
      }
      return of([]);
    })
    );
  }

  @Action(updateTodo)
  updateTodo(ctx: StateContext<TodoStateModel>, { payload }: updateTodo) {
    // return this.todoService.updateTodo(payload).pipe(tap((result) => {
    //     const state = ctx.getState();
    //     const todoList = [...state.todos];
    //     ctx.patchState({
    //       todos: todoList,
    //     });
    // }));
  }

  @Action(ToggleUser)
  toggleUser(ctx: StateContext<UserStateModel>, action: ToggleUser) {
    let validUser = action.payload.validUser;
    // validUser = !validUser
    // console.log(action.payload)
    ctx.patchState({
      userInfo: [action.payload]
    })
  }
}