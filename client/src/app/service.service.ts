import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Require {
  id?: any,
  title?: string,
  count: number
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  createRequire(require: Require): Observable<Require> {
    return this.http.post<Require>('http://localhost:3000/api/todos/create', require)
  }

  getAll(): Observable<Require[]> {
    return this.http.get<Require[]>('http://localhost:3000/api/todos')
  }

  getById(id: string): Observable<Require> {
    return this.http.get<Require>(`http://localhost:3000/api/todos/${id}`)
      .pipe(map((require: Require) => {
        return {
          ...require, id 
        }
      }))
  }

  updateRequire(id: string, counter): Observable<Require> {
    return this.http.put<Require>(`http://localhost:3000/api/todos/update/${id}`, {
      count: counter+1
    })
  }


}
