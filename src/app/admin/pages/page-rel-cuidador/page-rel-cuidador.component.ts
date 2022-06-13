import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RelCuidador } from 'src/app/models/RelCuidador';
import { DeleteRelComponent } from '../../forms/delete-rel/delete-rel.component';
import { DeleteComponent } from '../../forms/delete/delete.component';
import { FormRelCuidadorComponent } from '../../forms/form-rel-cuidador/form-rel-cuidador.component';
import { RelCuidadorService } from '../../services/rel-cuidador.service';

@Component({
  selector: 'app-page-rel-cuidador',
  templateUrl: './page-rel-cuidador.component.html',
  styleUrls: ['./page-rel-cuidador.component.css'],
})
export class PageRelCuidadorComponent implements OnInit {
  relCuidador: RelCuidador = new RelCuidador();

  displayedColumns: string[] = ['CUIDADOR', 'ANIMAL', 'HORARIO', 'ACCIONES'];
  dataSource = new MatTableDataSource<RelCuidador>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator | null;

  constructor(
    private relCuidadorService: RelCuidadorService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerRelCuidadores();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  obtenerRelCuidadores() {
    this.relCuidadorService.obtenerRelCuidadores().subscribe((res: any) => {
      if (Array.isArray(res)) {
        this.dataSource = new MatTableDataSource<RelCuidador>([...res]);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  openAddWindow(): void {
    this.relCuidador = new RelCuidador();
    this.openForm();
  }

  openDeleteWindow(relCuidador: RelCuidador): any {
    if (
      relCuidador.id_animal != undefined &&
      relCuidador.id_cuidador != undefined
    ) {
      this.openDelete(
        relCuidador.id_cuidador,
        relCuidador.id_animal,
        relCuidador.nombre_cuidador + ' - ' + relCuidador.nombre_animal
      );
    }
  }

  openDelete(id1: number, id2: number, nombre: string): void {
    const dialogRef = this.dialog.open(DeleteRelComponent, {
      width: '320px',
      data: {
        id: id1,
        id2: id2,
        nombre: nombre,
        action: undefined,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (result['action'] != undefined && result['action']) {
          this.authService.verifyAutentication().subscribe((res) => {
            if (!res) {
              this.authService.logout();
            }
          });
          this.relCuidadorService
            .eliminarRelCuidador(result['id'], result['id2'])
            .subscribe((res) => {
              if (res.length == 0) {
                this._snackBar.open(
                  'Se ha eliminado la relCuidador con exito',
                  '',
                  {
                    duration: 3000,
                    panelClass: ['mat-toolbar', 'mat-primary'],
                  }
                );
                this.obtenerRelCuidadores();
              } else {
                this._snackBar.open(
                  'Algo ha ocurrido, intentelo más tarde',
                  '',
                  {
                    duration: 3000,
                    panelClass: ['mat-toolbar', 'mat-warn'],
                  }
                );
              }
            });
        }
      }
    });
  }

  openForm(): void {
    const dialogRef = this.dialog.open(FormRelCuidadorComponent, {
      width: '450px',
      data: this.relCuidador,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.authService.verifyAutentication().subscribe((res) => {
          if (!res) {
            this.authService.logout();
          }
        });
        this.relCuidadorService
          .añadirRelCuidador(this.relCuidador)
          .subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open(
                'Se ha agregado la relCuidador con éxito',
                '',
                {
                  duration: 3000,
                  panelClass: ['mat-toolbar', 'mat-primary'],
                }
              );
              this.obtenerRelCuidadores();
            } else {
              this._snackBar.open('Algo ha ocurrido, intentelo más tarde', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-warn'],
              });
            }
          });
      }
    });
  }
}
