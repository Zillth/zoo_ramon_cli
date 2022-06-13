import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Distribucion } from 'src/app/models/Distribucion';

@Component({
  selector: 'app-form-distribucion',
  templateUrl: './form-distribucion.component.html',
  styleUrls: ['./form-distribucion.component.css'],
})
export class FormDistribucionComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FormDistribucionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Distribucion
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
