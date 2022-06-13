import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Animal } from 'src/app/models/Animal';
import { RelTipo } from 'src/app/models/RelTipo';
import { Tipo } from 'src/app/models/Tipo';
import { AnimalService } from '../../services/animal.service';
import { TipoService } from '../../services/tipo.service';

@Component({
  selector: 'app-form-rel-tipo',
  templateUrl: './form-rel-tipo.component.html',
  styleUrls: ['./form-rel-tipo.component.css']
})
export class FormRelTipoComponent implements OnInit {

  tipos: Tipo[] = [];
  animales: Animal[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormRelTipoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RelTipo,
    private tipoService: TipoService,
    private animalService: AnimalService
  ) {}

  ngOnInit(): void {
    this.animalService.obtenerAnimales().subscribe(res => {
      this.animales = [...res];
    });
    this.tipoService.obtenerTipos().subscribe(res => {
      this.tipos = [...res];
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
