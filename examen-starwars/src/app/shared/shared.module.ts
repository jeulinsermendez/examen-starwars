import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './layout/components/top-bar/top-bar/top-bar.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import {​​​​​MatInputModule}​​​​​ from '@angular/material/input';

@NgModule({
  declarations: [TopBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    ​​​​​MatInputModule
  ],
  exports: [
    TopBarComponent,
    ​​​​​MatInputModule,
    MatDialogModule
  ]

})
export class SharedModule { }
