import { ApiResponse } from './../../../models/api-response.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Ship } from 'src/app/models/ship.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ListShipsService {

  totalItems: number;
  private ships: BehaviorSubject<Ship[]> = new BehaviorSubject<Ship[]>([]);
  ships$ = this.ships.asObservable();

  constructor( private http: HttpClient) { }

  loadShips(page: number ): void {
    this.http.get<ApiResponse>(environment.urlAPI + 'starships/?page=' + page).subscribe(
      apiResponse => {
        this.totalItems =  Number.parseInt(apiResponse.count, null);
        apiResponse.results.forEach(ship => {
          const urlValues = ship.url.split('/').filter(x => x !== '');
          ship.image = environment.imageAPI + urlValues[urlValues.length - 1] + '.jpg';
        });
        this.ships.next(apiResponse.results);
      });
   }
}
