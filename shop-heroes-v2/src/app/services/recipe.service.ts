import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Recipe } from '../objects/recipe';
import { Category } from '../objects/category';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const root = "http://localhost:8080/recipe"

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

    constructor(private http: HttpClient) { }

    addRecipe(recipe: Recipe): Observable<Recipe> {
      return this.http.post<Recipe>(`${root}/addRecipe`, recipe, httpOptions)
        .pipe(
          catchError(this.handleError<Recipe>('addRecipe'))
        );
    }

    getAll(): Observable<any> {
      return this.http.get(`${root}/getAll`, httpOptions)
      .pipe(
        catchError(this.handleError<any>('getAll'))
      );
    }

    getRecipesByCategory(category: Category): Observable<any> {
      return this.http.post<Category>(`${root}/getByCategory`, category, httpOptions)
        .pipe(
          catchError(this.handleError<Category>('getRecipesByCategory'))
        );
    }

    deleteRecipe(recipe: Recipe): Observable<any> {
      return this.http.delete<Recipe>(`${root}/deleteRecipe?idRecipe=${recipe.id}`, httpOptions)
        .pipe(
          catchError(this.handleError<Category>('deleteRecipe'))
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