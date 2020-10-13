import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ship-add-edit',
  templateUrl: './ship-add-edit.component.html',
})
export class ShipAddEditComponent implements OnInit {

  shipsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.shipsForm = this.formBuilder.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      image: [''],
    });
  }
}
