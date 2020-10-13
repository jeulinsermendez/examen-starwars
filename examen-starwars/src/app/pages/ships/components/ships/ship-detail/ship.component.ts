import { Component, Input, OnInit } from '@angular/core';
import { Ship } from 'src/app/models/ship.model';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss']
})
export class ShipComponent implements OnInit {

 @Input() ship: Ship;

  constructor() {
   }

  ngOnInit(): void {
  }

}
