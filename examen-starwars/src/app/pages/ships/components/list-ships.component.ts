import { ListShipsService } from './list-ships.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShipAddEditComponent } from './ships/ship-add-edit/ship-add-edit.component';
import { Ship } from '../../../models/ship.model';

@Component({
  selector: 'app-list-ships',
  templateUrl: './list-ships.component.html',
  styleUrls: ['./list-ships.component.scss'],
  providers: [ListShipsService]
})
export class ListShipsComponent implements OnInit {

  currentPage: number;

  constructor(
    public listShipsService: ListShipsService,
    public matDialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.currentPage = 1;
    this.loadShips(this.currentPage);
  }

  pageChange(page: number): void {
    this.currentPage = page;
    this.loadShips(this.currentPage);
  }

  loadShips(page: number): void {
    this.listShipsService.loadShips(page);
  }

  createShip(): void {
    const dialogRef = this.matDialog.open(ShipAddEditComponent, {
      data: null
    });
    dialogRef.afterClosed (). subscribe ( result => {
      this.listShipsService.createShip(result);
    });
  }

  editShip(ship: Ship): void {
    const dialogRef = this.matDialog.open(ShipAddEditComponent, {
      data: ship
    });
    dialogRef.afterClosed (). subscribe ( result => {
      this.listShipsService.editShip(result);
    });
  }
}
