import { ListShipsService } from './list-ships.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-ships',
  templateUrl: './list-ships.component.html',
  styleUrls: ['./list-ships.component.scss'],
  providers: [ListShipsService]
})
export class ListShipsComponent implements OnInit {

  currentPage: number;

  constructor(public listShipsService: ListShipsService) {
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

  makeAShip(): void {


  }
}
