import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListShipsComponent } from './list-ships.component';

const routes: Routes = [
  {
    path: '',
    component: ListShipsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListShipsRoutingModule { }
