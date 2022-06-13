import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Distribucion } from 'src/app/models/Distribucion';
import { DeleteComponent } from '../../forms/delete/delete.component';
import { FormDistribucionComponent } from '../../forms/form-distribucion/form-distribucion.component';
import { DistribucionService } from '../../services/distribucion.service';

@Component({
  selector: 'app-page-distribucion',
  templateUrl: './page-distribucion.component.html',
  styleUrls: ['./page-distribucion.component.css']
})
export class PageDistribucionComponent implements OnInit, AfterViewInit {
  distribucion: Distribucion = new Distribucion();
  lastId: number | undefined;

  displayedColumns: string[] = [
    'ID',
    'NOMBRE',
    'DESCRIPCION',
  ];
  dataSource = new MatTableDataSource<Distribucion>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator | null;

  constructor(
    private distribucionService: DistribucionService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerDistribuciones();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  obtenerDistribuciones() {
    this.distribucionService.obtenerDistribuciones().subscribe((res: any) => {
      if (Array.isArray(res)) {
        this.dataSource = new MatTableDataSource<Distribucion>([...res]);
        this.dataSource.paginator = this.paginator;
        this.lastId = res[res.length - 1]['id_distribucion'];
      }
    });
  }

  openUpdateWindow(distribucion: Distribucion): void {
    this.distribucion = distribucion;
    this.openForm();
  }

  openAddWindow(): void {
    this.distribucion = new Distribucion();
    this.openForm();
  }

  openDeleteWindow(distribucion: Distribucion): any {
    if (distribucion.id_distribucion != undefined && distribucion.nombre_distribucion != undefined) {
      this.openDelete(distribucion.id_distribucion, distribucion.nombre_distribucion);
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
          this.distribucionService.eliminarDistribucion(result['id']).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha eliminado la distribucion con exito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerDistribuciones();
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
    const dialogRef = this.dialog.open(FormDistribucionComponent, {
      width: '450px',
      data: this.distribucion,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.authService.verifyAutentication().subscribe((res) => {
          if (!res) {
            this.authService.logout();
          }
        });

        if (result['id_distribucion'] == undefined) {
          if (this.lastId != undefined) {
            this.distribucion.id_distribucion = this.lastId + 1;
          }
          this.distribucionService.añadirDistribucion(this.distribucion).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha agregado la distribucion con éxito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerDistribuciones();
            } else {
              this._snackBar.open('Algo ha ocurrido, intentelo más tarde', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-warn'],
              });
            }
          });
        } else if (result['id_distribucion'] > 0) {
          this.distribucionService.modificarDistribucion(this.distribucion).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha modificado la distribucion con éxito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerDistribuciones();
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
}
