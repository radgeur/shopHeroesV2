import { Injectable } from '@angular/core';
import { Player } from '../objects/player';
import { Worker } from '../objects/worker';
import { Observable, of, Subject } from 'rxjs';
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

  private player: Player;
  playerSubject = new Subject<Player>();

  constructor(private http: HttpClient) { }

  getPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(`${root}/infos`,player, httpOptions)
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

  getPlayerById(id: number): Observable<Player> {
    return this.http.get<Player>(`${root}?id=${id}`, httpOptions)
      .pipe(
        catchError(this.handleError<Player>(`getPlayerById`))
      );
  }

  addWorkerToCurrentPlayer(idPlayer: number, worker: Worker): Observable<any>{
    return this.http.post<Worker>(`${root}/addWorkerToPlayer?idPlayer=${idPlayer}`, worker, httpOptions)
      .pipe(
        catchError(this.handleError<any>('addWorkerToCurrentPlayer'))
      );
  }

  updateMaterialQuantities(player: Player): Observable<Player> {
    return this.http.post(`${root}/udpateMaterialQuantity`, player, httpOptions)
    .pipe(
      catchError(this.handleError<any>('updateMaterialQuantities'))
    );
  }

  isLoggedIn(): boolean  {
    return  (sessionStorage.getItem('player') === null 
      || sessionStorage.getItem('player') === undefined
      || sessionStorage.getItem('player') === "undefined") ? false : true;;
  }

  emitPlayerSubject(){
    this.player = JSON.parse(sessionStorage.getItem("player"));
    this.playerSubject.next(this.player);
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
