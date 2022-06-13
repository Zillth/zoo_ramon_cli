import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAnimalComponent } from './pages/page-animal/page-animal.component';
import { PageCuidadorComponent } from './pages/page-cuidador/page-cuidador.component';
import { PageRelCuidadorComponent } from './pages/page-rel-cuidador/page-rel-cuidador.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'animales',
        component: PageAnimalComponent
      },
      {
        path: 'cuidadores',
        component: PageCuidadorComponent
      },
      {
        path: 'relacion-cuidadores',
        component: PageRelCuidadorComponent
      },
      {
        path: '',
        redirectTo: 'animales',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '404'
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
