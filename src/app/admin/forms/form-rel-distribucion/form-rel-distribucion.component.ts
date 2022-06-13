import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Animal } from 'src/app/models/Animal';
import { Distribucion } from 'src/app/models/Distribucion';
import { RelDistribucion } from 'src/app/models/RelDistribucion';
import { AnimalService } from '../../services/animal.service';
import { DistribucionService } from '../../services/distribucion.service';

@Component({
  selector: 'app-form-rel-distribucion',
  templateUrl: './form-rel-distribucion.component.html',
  styleUrls: ['./form-rel-distribucion.component.css'],
})
export class FormRelDistribucionComponent implements OnInit {

  distribuciones: Distribucion[] = [];
  animales: Animal[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormRelDistribucionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RelDistribucion,
    private distribucionService: DistribucionService,
    private animalService: AnimalService
  ) {}

  ngOnInit(): void {
    this.animalService.obtenerAnimales().subscribe(res => {
      this.animales = [...res];
    });
    this.distribucionService.obtenerDistribuciones().subscribe(res => {
      this.distribuciones = [...res];
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
