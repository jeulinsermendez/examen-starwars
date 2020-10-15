import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipAddEditComponent } from './ship-add-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ship } from '../../../../../models/ship.model';
import { Observable } from 'rxjs';

describe('ShipAddEditComponent', () => {
  let component: ShipAddEditComponent;
  let fixture: ComponentFixture<ShipAddEditComponent>;
  const ship: Ship = {
    name: 'nave1',
    model: 'model1',
    id: '1',
    crew: 'crew1',
    url: 'https://starwars-visualguide.com/assets/img/1.jpg'
   };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipAddEditComponent ],
      imports: [ReactiveFormsModule, FormsModule, ​​​​​MatDialogModule],
      providers: [
        {
          provide: MatDialogRef, useValue: {close: (shipDialog) => ship }
        },
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

  it('should save', () => {
    const matDialogRef = TestBed.inject(MatDialogRef);
    spyOn(component.dialogRef, 'close').and.callThrough();
    component.save(null);

  });

  it('should processFile', () => {
    const file = {
      files: [
      new Blob([''], { type: 'text/html', })
      ]
    };

    component.processFile(file);
    expect(component.shipsForm.get('image').value).toBeNull();
  });
});
