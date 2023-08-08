import { Todo, User } from './todo';

export class CreateTodo {
  static readonly type = '[TODO] Create';
  constructor( public description: string) {
    return
  }
}

export class ToggleTodo {
  static readonly type = '[TODO] Toggle';

  constructor(public payload: Todo) { }
}

export class DeleteTodo {
  static readonly type = '[TODO] Delete';

  constructor(public payload: Todo) { }
}

export class ToggleAllTodos {
  static readonly type = '[TODO] Toggle all';
}

export class DeleteAll {
  static readonly type = '[TODO] Delete all';
}

export class ToggleUser {
  static readonly type = '[updateUser] Toggle';
  constructor(public payload: User) { }
}
export class GetUsers {
  static readonly type = '[updateUser] Toggle';
  constructor(public payload: User) { }
}
export class GetTodos {
  static readonly type = '[updateUser] Toggle';
  constructor(public payload: User) { }}

  export class updateTodo {
    static readonly type = '[updateUser] Toggle';
    constructor(public payload: any) { }
  }
  