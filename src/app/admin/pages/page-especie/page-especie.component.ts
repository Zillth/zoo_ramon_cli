import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Especie } from 'src/app/models/Especie';
import { DeleteComponent } from '../../forms/delete/delete.component';
import { FormEspecieComponent } from '../../forms/form-especie/form-especie.component';
import { EspecieService } from '../../services/especie.service';

@Component({
  selector: 'app-page-especie',
  templateUrl: './page-especie.component.html',
  styleUrls: ['./page-especie.component.css'],
})
export class PageEspecieComponent implements OnInit, AfterViewInit {
  especie: Especie = new Especie();
  lastId: number | undefined;

  displayedColumns: string[] = ['ID', 'NOMBRE'];
  dataSource = new MatTableDataSource<Especie>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator | null;

  constructor(
    private especieService: EspecieService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerEspeciees();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  obtenerEspeciees() {
    this.especieService.obtenerEspecies().subscribe((res: any) => {
      if (Array.isArray(res)) {
        this.dataSource = new MatTableDataSource<Especie>([...res]);
        this.dataSource.paginator = this.paginator;
        this.lastId = res[res.length - 1]['id_especie'];
      }
    });
  }

  openUpdateWindow(especie: Especie): void {
    this.especie = especie;
    this.openForm();
  }

  openAddWindow(): void {
    this.especie = new Especie();
    this.openForm();
  }

  openDeleteWindow(especie: Especie): any {
    if (
      especie.id_especie != undefined &&
      especie.nombre_especie != undefined
    ) {
      this.openDelete(especie.id_especie, especie.nombre_especie);
    }
  }

  openDelete(id: number, nombre: string): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '320px',
      data: {
        id: id,
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
          this.especieService.eliminarEspecie(result['id']).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha eliminado la especie con exito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerEspeciees();
            } else {
              this._snackBar.open('Algo ha ocurrido, intentelo más tarde', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-warn'],
              });
            }
          });
        }
      }
    });
  }

  openForm(): void {
    const dialogRef = this.dialog.open(FormEspecieComponent, {
      width: '450px',
      data: this.especie,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.authService.verifyAutentication().subscribe((res) => {
          if (!res) {
            this.authService.logout();
          }
        });

        if (result['id_especie'] == undefined) {
          if (this.lastId != undefined) {
            this.especie.id_especie = this.lastId + 1;
          }
          this.especieService.añadirEspecie(this.especie).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha agregado la especie con éxito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerEspeciees();
            } else {
              this._snackBar.open('Algo ha ocurrido, intentelo más tarde', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-warn'],
              });
            }
          });
        } else if (result['id_especie'] > 0) {
          this.especieService
            .modificarEspecie(this.especie)
            .subscribe((res) => {
              if (res.length == 0) {
                this._snackBar.open(
                  'Se ha modificado la especie con éxito',
                  '',
                  {
                    duration: 3000,
                    panelClass: ['mat-toolbar', 'mat-primary'],
                  }
                );
                this.obtenerEspeciees();
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
}
