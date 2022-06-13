import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-rel',
  templateUrl: './delete-rel.component.html',
  styleUrls: ['./delete-rel.component.css'],
})
export class DeleteRelComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteRelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.data.action = true;
  }
}

export interface DialogData {
  id1: number | undefined;
  id2: number | undefined;
  nombre: string | undefined;
  action: boolean | undefined;
}
