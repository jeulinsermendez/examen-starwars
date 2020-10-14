import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShipsComponent } from './list-ships.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ListShipsComponent', () => {
  let component: ListShipsComponent;
  let fixture: ComponentFixture<ListShipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListShipsComponent ],
      imports:[HttpClientTestingModule,​​​​​MatDialogModule, NgxPaginationModule],
      providers:[RouterModule ]
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
});
