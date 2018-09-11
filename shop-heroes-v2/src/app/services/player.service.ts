import { Injectable } from '@angular/core';
import { Player } from '../objects/player';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const root = "http://localhost:8080/player"

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  constructor(private http: HttpClient) { }

  getPlayer(name: String, password: String): Observable<Player> {
    return this.http.get<Player>(`${root}?name=${name}&password=${password}`, httpOptions)
      .pipe(
        catchError(this.handleError<Player>(`getPlayer`))
      );
  }

  signUpPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(`${root}/signup`, player, httpOptions)
      .pipe(
        catchError(this.handleError<Player>('signUpPlayer'))
      );
  }

  updateStoneQuantity(player: Player, quantity: number): Observable<Player> {
    return this.http.post(`${root}/updateStoneQuantity?quantity=${quantity}`, player, httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateStoneQuantity'))
      );
  }

  updateWoodQuantity(player: Player, quantity: number): Observable<Player> {
    return this.http.post(`${root}/updateWoodQuantity?quantity=${quantity}`, player, httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateWoodQuantity'))
      );
  }

  updateLeatherQuantity(player: Player, quantity: number): Observable<Player> {
    return this.http.post(`${root}/updateLeatherQuantity?quantity=${quantity}`, player, httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateLeatherQuantity'))
      );
  }

  updateHerbQuantity(player: Player, quantity: number): Observable<Player> {
    return this.http.post(`${root}/updateHerbQuantity?quantity=${quantity}`, player, httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateHerbQuantity'))
      );
  }

  updateQuantities(player: Player, stone: number, wood:number, leather: number, herb: number): Observable<Player> {
    return this.http.post(`${root}/updateQuantities?stoneQuantity=${stone}&woodQuantity=${wood}
      &leatherQuantity=${leather}&herbQuantity=${herb}`, player, httpOptions)
    .pipe(
      catchError(this.handleError<any>('updateHerbQuantity'))
    );
  }

  isLoggedIn(): boolean  {
    return  (sessionStorage.getItem('player') === null 
      || sessionStorage.getItem('player') === undefined
      || sessionStorage.getItem('player') === "undefined") ? false : true;;
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
