import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Especie } from 'src/app/models/Especie';

@Component({
  selector: 'app-form-especie',
  templateUrl: './form-especie.component.html',
  styleUrls: ['./form-especie.component.css']
})
export class FormEspecieComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FormEspecieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Especie
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
