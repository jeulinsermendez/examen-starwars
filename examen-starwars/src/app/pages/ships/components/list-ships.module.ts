import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListShipsComponent } from './list-ships.component';
import { ShipComponent } from './ships/ship-detail/ship.component';
import { ShipAddEditComponent } from './ships/ship-add-edit/ship-add-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {​​​​​MatDialogModule}​​​​​ from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { ListShipsRoutingModule } from './list-ships-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ListShipsComponent,
    ShipComponent,
    ShipAddEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    ListShipsRoutingModule,
    NgxPaginationModule
  ],
})

export class ListShipsModule { }
