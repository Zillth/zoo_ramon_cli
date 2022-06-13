import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ecosistema } from 'src/app/models/Ecosistema';

@Component({
  selector: 'app-form-ecosistema',
  templateUrl: './form-ecosistema.component.html',
  styleUrls: ['./form-ecosistema.component.css'],
})
export class FormEcosistemaComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FormEcosistemaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ecosistema
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
