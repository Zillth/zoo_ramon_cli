import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Animal } from 'src/app/models/Animal';
import { Ecosistema } from 'src/app/models/Ecosistema';
import { Especie } from 'src/app/models/Especie';
import { ZonaExhibicion } from 'src/app/models/ZonaExhibicion';
import { EcosistemaService } from '../../services/ecosistema.service';
import { EspecieService } from '../../services/especie.service';
import { ZonaExhibicionService } from '../../services/zona-exhibicion.service';

@Component({
  selector: 'app-form-animal',
  templateUrl: './form-animal.component.html',
  styleUrls: ['./form-animal.component.css']
})
export class FormAnimalComponent implements OnInit {

  especies: Especie[] = [];
  zonas: ZonaExhibicion[] = [];
  ecosistemas: Ecosistema[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormAnimalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Animal,
    private especieService : EspecieService,
    private zonaExhibicionService: ZonaExhibicionService,
    private ecosistemaService: EcosistemaService
  ) { }

  ngOnInit(): void {
    this.especieService.obtenerEspecies().subscribe(res => {
      this.especies = [...res];
    });
    this.zonaExhibicionService.obtenerZonaExhibiciones().subscribe(res => {
      this.zonas = [...res];
    });
    this.ecosistemaService.obtenerEcosistemas().subscribe(res => {
      this.ecosistemas = [...res];
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
