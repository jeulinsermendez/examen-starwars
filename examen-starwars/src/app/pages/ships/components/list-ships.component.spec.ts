import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShipsComponent } from './list-ships.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { ListShipsService } from './list-ships.service';
import { ListShipsServiceMock } from '../../../../assets/mocks/list-ships.service.mock';
import { ShipAddEditComponent } from './ships/ship-add-edit/ship-add-edit.component';
import { Observable } from 'rxjs';
import { Ship } from '../../../models/ship.model';

describe('ListShipsComponent', () => {
  let component: ListShipsComponent;
  let fixture: ComponentFixture<ListShipsComponent>;
  const ship: Ship = {
    name: 'nave1',
    model: 'model1',
    id: 'id1',
    crew: 'crew1'
   };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListShipsComponent ],
      imports: [
        HttpClientTestingModule,​​​​​
        MatDialogModule,
        NgxPaginationModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ListShipsService, useClass: ListShipsServiceMock
        },
        {
          provide: MatDialogRef, useValue: {afterClosed: () => new Observable<Ship>(x => x.next(ship))}
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pageChange', () => {
    component.pageChange(1);
    expect(component.currentPage).toEqual(1);
  });

  it('should createShip', () => {
    const matDialogRef = TestBed.inject(MatDialogRef);
    spyOn(component.matDialog, 'open').and.returnValue(matDialogRef);
    spyOn(component.listShipsService, 'createShip').withArgs(ship).and.callThrough();
    component.listShipsService.ships$.subscribe(ships => {
      expect(ships).not.toBe(null);
    });
    component.createShip();
    expect(component.matDialog.open).toHaveBeenCalled();
  });

});
