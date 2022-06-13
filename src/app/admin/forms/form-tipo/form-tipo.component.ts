import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tipo } from 'src/app/models/Tipo';

@Component({
  selector: 'app-form-tipo',
  templateUrl: './form-tipo.component.html',
  styleUrls: ['./form-tipo.component.css'],
})
export class FormTipoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FormTipoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tipo
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
