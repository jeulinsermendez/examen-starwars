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

  currentPage: number;
  totalItems: number;
  private ships: BehaviorSubject<Ship[]> = new BehaviorSubject<Ship[]>([]);
  ships$ = this.ships.asObservable();
  cachedShips$: Map<number, Observable<ApiResponse>> = new Map<number, Observable<ApiResponse>>();

  constructor( private http: HttpClient) {
   /* timer(0, 3000).subscribe(_ => {
      this.cachedShips$ = this.getShipsFromApi(this.currentPage);
    });*/
    //this.cachedShips$ = this.getShipsFromApi(this.currentPage);
   }

  loadShips(page: number ): void {
    this.currentPage = page;
    if (this.cachedShips$ === undefined ) {
      this.cachedShips$ = this.getShipsFromApi(this.currentPage);
    }
    this.cachedShips$.subscribe(
      apiResponse => {
        this.totalItems =  Number.parseInt(apiResponse.count, null);
        apiResponse.results.forEach(ship => {
          const urlValues = ship.url.split('/').filter(x => x !== '');
          ship.image = environment.imageAPI + urlValues[urlValues.length - 1] + '.jpg';
          ship.id = urlValues[urlValues.length - 1];
        });
        this.ships.next(apiResponse.results);
      });
   }

   getShipsFromApi(page: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.urlAPI + 'starships/?page=' + page)
    .pipe(
      shareReplay({
        bufferSize: 1,
        refCount: true,
        windowTime: 3000
      })
    );
   }

   createShip(ship: Ship): void {
    const maxShipsId = this.ships.getValue().map(x => Number.parseInt(x.id, null))
    .reduce((a, b) => Math.max(a, b));
    ship.id =  (maxShipsId + 1).toString();
    let ships: Ship[] = [];
    ships.push(ship);
    ships = ships.concat(this.ships.getValue());
    this.ships.next(ships);
   }

   editShip(ship: Ship): void {
    const foundShipIndex = this.ships.getValue().findIndex(x => x.id === ship.id);
    this.ships.getValue()[foundShipIndex].name = ship.name;
    this.ships.getValue()[foundShipIndex].model = ship.model;
    this.ships.getValue()[foundShipIndex].image = ship.image;
    this.ships.getValue()[foundShipIndex].crew = ship.crew;
    this.ships.next(this.ships.getValue());
   }
}
