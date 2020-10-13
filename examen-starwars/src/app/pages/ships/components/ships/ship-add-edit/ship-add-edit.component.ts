import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ship } from 'src/app/models/ship.model';

@Component({
  selector: 'app-ship-add-edit',
  templateUrl: './ship-add-edit.component.html',
})
export class ShipAddEditComponent implements OnInit {

  shipsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef <ShipAddEditComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Ship
    ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.shipsForm = this.formBuilder.group({
      id: [this.data?.id],
      name: [this.data?.name, Validators.required],
      model: [this.data?.model, Validators.required],
      crew: [this.data?.crew, Validators.required],
      image: [this.data?.image],
    });
  }

  save(data): void {
      if (this.shipsForm.valid) {
        const ship: Ship = {
          id: this.shipsForm.get('id').value,
          crew: this.shipsForm.get('crew').value,
          name: this.shipsForm.get('name').value,
          model: this.shipsForm.get('model').value,
          image: this.shipsForm.get('image').value
        };
        this.dialogRef.close(ship);
      }
  }

  processFile(file: any): void {​​​​​
    const reader = new FileReader();
    reader.readAsDataURL(file.files[0]);
    reader.onloadend = () => {​​​​​
      this.shipsForm.get('image').setValue(reader.result);
    };
  }
}
