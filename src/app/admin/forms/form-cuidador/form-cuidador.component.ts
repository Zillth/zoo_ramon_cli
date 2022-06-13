import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cuidador } from 'src/app/models/Cuidador';

@Component({
  selector: 'app-form-cuidador',
  templateUrl: './form-cuidador.component.html',
  styleUrls: ['./form-cuidador.component.css'],
})
export class FormCuidadorComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FormCuidadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cuidador
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
