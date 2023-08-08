import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { CreateTodo, ToggleUser ,GetTodos, GetUsers} from '../Store/todo.action';
import { User } from '../Store/todo';
import { TodoState } from '../Store/todo.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  todoForm: FormGroup;
  userForm: FormGroup;
  // validUser: boolean = false;
  @Select(TodoState.userDetails)
  userDetails!: Observable<any>;

  constructor(private fb: FormBuilder,
    private store: Store) {

    this.userForm = fb.group({
      'userName': ''
    });
    this.todoForm = fb.group({
      'description': '',
      'name': ''
    });



  }

  submitUser() {
    const userName = this.userForm.value.userName;
    const validUser = true;
    const submit = false;
    let userInfo = {userName,validUser,submit}
    this.store.dispatch(new GetUsers(userInfo));

  }

  submitTodo() {
    const description = this.todoForm.value.description;
    this.store.dispatch(new CreateTodo(description));
    this.todoForm.reset()
  }
}
