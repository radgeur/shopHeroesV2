import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import {Worker} from '../objects/worker'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const root = "http://localhost:8080/worker"

@Injectable({
  providedIn: 'root'
})

export class WorkerService {

  constructor(private http: HttpClient) { }

  add(worker: Worker): Observable<any> {
      console.log(worker);
    return this.http.post(`${root}/insert`, worker, httpOptions)
      .pipe(
        catchError(this.handleError<any>('addWorker'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
