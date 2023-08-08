import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    baseUrl ="https://f44ca9d6-8360-48f9-b551-8a8e086915bd.mock.pstmn.io/getuser"
    constructor(private http: HttpClient) {
    }

    fetchTodos(userName:string) {
        return this.http.get<any>(this.baseUrl +'getUser/'+userName);
    }

    deleteTodo(id: number) {
        return this.http.delete(this.baseUrl +'deleteUser/'+id);
    }

    addTodo(payload: any) {
        return this.http.post<any>(this.baseUrl+ 'addUser', payload);
    }

    updateTodo(payload: any) {
        return this.http.put<any>(this.baseUrl+'updateUser', payload);
    }
}