import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Animal } from 'src/app/models/Animal';
import { Cuidador } from 'src/app/models/Cuidador';
import { RelCuidador } from 'src/app/models/RelCuidador';
import { AnimalService } from '../../services/animal.service';
import { CuidadorService } from '../../services/cuidador.service';

@Component({
  selector: 'app-form-rel-cuidador',
  templateUrl: './form-rel-cuidador.component.html',
  styleUrls: ['./form-rel-cuidador.component.css'],
})
export class FormRelCuidadorComponent implements OnInit {

  animales: Animal[] = []; 
  cuidadores: Cuidador[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormRelCuidadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RelCuidador,
    private animalService: AnimalService,
    private cuidadorService: CuidadorService
  ) {}

  ngOnInit(): void {
    this.animalService.obtenerAnimales().subscribe(res => {
      this.animales = [...res];
    });
    this.cuidadorService.obtenerCuidadores().subscribe(res => {
      this.cuidadores = [...res];
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
