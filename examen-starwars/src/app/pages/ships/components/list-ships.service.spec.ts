import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ListShipsService } from './list-ships.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiResponse } from '../../../models/api-response.model';
import { Ship } from '../../../models/ship.model';
import { Observable } from 'rxjs';

describe('ListShipsService', () => {
  let service: ListShipsService;
  const ship: Ship = {
    name: 'nave1',
    model: 'model1',
    id: '1',
    crew: 'crew1',
    url: 'https://starwars-visualguide.com/assets/img/1.jpg'
   };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,​​​​​ MatDialogModule],

    });
    service = TestBed.inject(ListShipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should loadShips', () => {
    const shipsArray: Ship[] = [];

    shipsArray.push(ship);

    const apiResponse: ApiResponse = {
      count: '1',
      results: shipsArray,
      next: '',
      previous: ''
    };

    spyOn(service.http, 'get').and.callThrough()
    .and.returnValue(new Observable<ApiResponse>((x) => x.next(apiResponse)));
    service.loadShips(1);
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should editShip', () => {
    const shipsArray: Ship[] = [];
    shipsArray.push(ship);
    service.ships.next(shipsArray);
    service.editShip(ship);
  });

  it('should createShip', () => {
    const shipsArray: Ship[] = [];
    shipsArray.push(ship);
    service.ships.next(shipsArray);
    service.createShip(ship);
  });

});
