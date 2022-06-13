import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ZonaExhibicion } from 'src/app/models/ZonaExhibicion';

@Component({
  selector: 'app-form-zona',
  templateUrl: './form-zona.component.html',
  styleUrls: ['./form-zona.component.css'],
})
export class FormZonaComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FormZonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ZonaExhibicion
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
