import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { DeleteComponent } from './forms/delete/delete.component';
import { MaterialModule } from '../material/material.module';
import { FormAnimalComponent } from './forms/form-animal/form-animal.component';
import { FormCuidadorComponent } from './forms/form-cuidador/form-cuidador.component';
import { FormDistribucionComponent } from './forms/form-distribucion/form-distribucion.component';
import { FormEcosistemaComponent } from './forms/form-ecosistema/form-ecosistema.component';
import { FormEspecieComponent } from './forms/form-especie/form-especie.component';
import { FormRelCuidadorComponent } from './forms/form-rel-cuidador/form-rel-cuidador.component';
import { FormRelDistribucionComponent } from './forms/form-rel-distribucion/form-rel-distribucion.component';
import { FormRelTipoComponent } from './forms/form-rel-tipo/form-rel-tipo.component';
import { FormTipoComponent } from './forms/form-tipo/form-tipo.component';
import { FormZonaComponent } from './forms/form-zona/form-zona.component';
import { PageAnimalComponent } from './pages/page-animal/page-animal.component';
import { PageCuidadorComponent } from './pages/page-cuidador/page-cuidador.component';
import { PageDistribucionComponent } from './pages/page-distribucion/page-distribucion.component';
import { PageEcosistemaComponent } from './pages/page-ecosistema/page-ecosistema.component';
import { PageEspecieComponent } from './pages/page-especie/page-especie.component';
import { PageRelCuidadorComponent } from './pages/page-rel-cuidador/page-rel-cuidador.component';
import { PageRelDistribucionComponent } from './pages/page-rel-distribucion/page-rel-distribucion.component';
import { PageRelTipoComponent } from './pages/page-rel-tipo/page-rel-tipo.component';
import { PageTipoComponent } from './pages/page-tipo/page-tipo.component';
import { PageZonaComponent } from './pages/page-zona/page-zona.component';
import { DeleteRelComponent } from './forms/delete-rel/delete-rel.component';


@NgModule({
  declarations: [
    DeleteComponent,
    FormAnimalComponent,
    FormCuidadorComponent,
    FormDistribucionComponent,
    FormEcosistemaComponent,
    FormEspecieComponent,
    FormRelCuidadorComponent,
    FormRelDistribucionComponent,
    FormRelTipoComponent,
    FormTipoComponent,
    FormZonaComponent,
    PageAnimalComponent,
    PageCuidadorComponent,
    PageDistribucionComponent,
    PageEcosistemaComponent,
    PageEspecieComponent,
    PageRelCuidadorComponent,
    PageRelDistribucionComponent,
    PageRelTipoComponent,
    PageTipoComponent,
    PageZonaComponent,
    DeleteRelComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class AdminModule { }
