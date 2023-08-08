import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { DeleteAll, ToggleAllTodos } from '../Store/todo.action';

@Component({
  selector: 'app-todo-control',
  templateUrl: './todo-control.component.html',
  styleUrls: ['./todo-control.component.scss']
})
export class TodoControlComponent {
  constructor(private store: Store) { }

  checkAll() {
    this.store.dispatch(new ToggleAllTodos());
  }

  deleteChecked() {
    // TODO: implement
    this.store.dispatch(new DeleteAll());

  }

  filterTodos(event:any) {
    // TODO: implement
    const filter: string = event.target.value;
  }

}
