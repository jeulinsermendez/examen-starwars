import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipAddEditComponent } from './ship-add-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ShipAddEditComponent', () => {
  let component: ShipAddEditComponent;
  let fixture: ComponentFixture<ShipAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipAddEditComponent ],
      imports: [ReactiveFormsModule, FormsModule, ​​​​​MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
