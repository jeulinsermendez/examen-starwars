import { ListShipsService } from '../../app/pages/ships/components/list-ships.service';
import { Ship } from '../../app/models/ship.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable ()
export class ListShipsServiceMock extends ListShipsService {

  totalItems: number;
  private shipsMock: BehaviorSubject<Ship[]> = new BehaviorSubject<Ship[]>([]);
  ships$ = this.shipsMock.asObservable();

  loadShips(page: number): void {
    this.totalItems = 1;
    const shipArray: Ship[] = [];
    const ship: Ship = {
      name: 'nave1',
      model: 'model1',
      id: 'id1',
      crew: 'crew1'
     };

    shipArray.push(ship);
    this.shipsMock.next(shipArray);
  }

  createShip(ship: Ship): void {
    const shipList = this.shipsMock.getValue();
    shipList.push(ship);
    this.shipsMock.next(shipList);
  }

  editShip(ship: Ship): void {  }
}
