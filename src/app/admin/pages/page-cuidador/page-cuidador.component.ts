import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Cuidador } from 'src/app/models/Cuidador';
import { DeleteComponent } from '../../forms/delete/delete.component';
import { CuidadorService } from '../../services/cuidador.service';
import { FormCuidadorComponent } from '../../forms/form-cuidador/form-cuidador.component';

@Component({
  selector: 'app-page-cuidador',
  templateUrl: './page-cuidador.component.html',
  styleUrls: ['./page-cuidador.component.css']
})
export class PageCuidadorComponent implements OnInit, AfterViewInit {
  cuidador: Cuidador = new Cuidador();
  lastId: number | undefined;

  displayedColumns: string[] = [
    'ID',
    'RFC',
    'NOMBRE',
    'TELEFONO',
    'ACCIONES'
  ];
  dataSource = new MatTableDataSource<Cuidador>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator | null;

  constructor(
    private cuidadorService: CuidadorService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerCuidadores();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  obtenerCuidadores() {
    this.cuidadorService.obtenerCuidadores().subscribe((res: any) => {
      if (Array.isArray(res)) {
        this.dataSource = new MatTableDataSource<Cuidador>([...res]);
        this.dataSource.paginator = this.paginator;
        this.lastId = res[res.length - 1]['id_cuidador'];
      }
    });
  }

  openUpdateWindow(cuidador: Cuidador): void {
    this.cuidador = cuidador;
    this.openForm();
  }

  openAddWindow(): void {
    this.cuidador = new Cuidador();
    this.openForm();
  }

  openDeleteWindow(cuidador: Cuidador): any {
    if (cuidador.id_cuidador != undefined && cuidador.nombre_cuidador != undefined) {
      this.openDelete(cuidador.id_cuidador, cuidador.nombre_cuidador);
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
          this.cuidadorService.eliminarCuidador(result['id']).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha eliminado el cuidador con exito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerCuidadores();
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
    const dialogRef = this.dialog.open(FormCuidadorComponent, {
      width: '450px',
      data: this.cuidador,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.authService.verifyAutentication().subscribe((res) => {
          if (!res) {
            this.authService.logout();
          }
        });

        if (result['id_cuidador'] == undefined) {
          if (this.lastId != undefined) {
            this.cuidador.id_cuidador = this.lastId + 1;
          }
          this.cuidadorService.añadirCuidador(this.cuidador).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha agregado el cuidador con éxito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerCuidadores();
            } else {
              this._snackBar.open('Algo ha ocurrido, intentelo más tarde', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-warn'],
              });
            }
          });
        } else if (result['id_cuidador'] > 0) {
          this.cuidadorService.modificarCuidador(this.cuidador).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha modificado el cuidador con éxito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerCuidadores();
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
