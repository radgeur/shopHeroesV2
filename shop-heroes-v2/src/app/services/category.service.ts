import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const root = "http://localhost:8080/category"

@Injectable({
    providedIn: 'root'
})

export class CategoryService {

    constructor(private http: HttpClient) { }

    addCategory(name: string): Observable<any> {
        return this.http.post(`${root}/add?name=${name}`, httpOptions)
            .pipe(
                catchError(this.handleError<any>(`addCategory`))
            );
    }

    getAll(): Observable<any> {
        return this.http.get(`${root}/all`, httpOptions)
            .pipe(
                catchError(this.handleError<any>(`selectAllCategories`))
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