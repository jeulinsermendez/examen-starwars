import { ApiResponse } from './../../../models/api-response.model';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { Injectable } from '@angular/core';
import { Ship } from 'src/app/models/ship.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { shareReplay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ListShipsService {
  totalItems: number;
  ships: BehaviorSubject<Ship[]> = new BehaviorSubject<Ship[]>([]);
  ships$ = this.ships.asObservable();
  cachedShips$: Map<number, Observable<ApiResponse>> = new Map<number, Observable<ApiResponse>>();

  constructor(public http: HttpClient) {
    timer(0, 300000).subscribe(_ => {
      this.cachedShips$.clear();
    });
  }

  loadShips(page: number): void {
    if (!this.cachedShips$.has(page)) {
      this.cachedShips$.set(page, this.getShipsFromApi(page));
    }
    this.cachedShips$.get(page).subscribe(
      apiResponse => {
        this.totalItems = Number.parseInt(apiResponse.count, null);
        apiResponse.results.forEach(ship => {
          const urlValues = ship.url.split('/').filter(x => x !== '');
          ship.image = environment.imageAPI + urlValues[urlValues.length - 1] + '.jpg';
          ship.id = urlValues[urlValues.length - 1];
        });
        this.ships.next(apiResponse.results);
      });
  }

 private getShipsFromApi(page: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.urlAPI + 'starships/?page=' + page)
      .pipe(
        shareReplay({
          bufferSize: 1,
          refCount: true,
          windowTime: 300000
        })
      );
  }

  createShip(ship: Ship): void {
    const allShips = this.ships.getValue().map(x => Number.parseInt(x.id, null));
    const maxShipsId =  allShips.length > 0 ?
      allShips.reduce((a, b) => Math.max(a, b)) : 0;
    ship.id = (maxShipsId + 1).toString();
    let ships: Ship[] = [];
    ships.push(ship);
    this.ships.getValue().splice(-1, 1);
    ships = ships.concat(this.ships.getValue());
    this.ships.next(ships);
  }

  editShip(ship: Ship): void {
    if (ship === undefined){
      return ;
    }
    const foundShipIndex = this.ships.getValue().findIndex(x => x.id === ship.id);
    this.ships.getValue()[foundShipIndex].name = ship.name;
    this.ships.getValue()[foundShipIndex].model = ship.model;
    this.ships.getValue()[foundShipIndex].image = ship.image;
    this.ships.getValue()[foundShipIndex].crew = ship.crew;
    this.ships.next(this.ships.getValue());
  }
}​​​​​​
