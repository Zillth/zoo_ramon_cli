import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Tipo } from 'src/app/models/Tipo';
import { DeleteComponent } from '../../forms/delete/delete.component';
import { FormTipoComponent } from '../../forms/form-tipo/form-tipo.component';
import { TipoService } from '../../services/tipo.service';

@Component({
  selector: 'app-page-tipo',
  templateUrl: './page-tipo.component.html',
  styleUrls: ['./page-tipo.component.css']
})
export class PageTipoComponent implements OnInit, AfterViewInit {
  tipo: Tipo = new Tipo();
  lastId: number | undefined;

  displayedColumns: string[] = [
    'ID',
    'NOMBRE',
    'DESCRIPCIÓN',
  ];
  dataSource = new MatTableDataSource<Tipo>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator | null;

  constructor(
    private tipoService: TipoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerTipoes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  obtenerTipoes() {
    this.tipoService.obtenerTipos().subscribe((res: any) => {
      if (Array.isArray(res)) {
        this.dataSource = new MatTableDataSource<Tipo>([...res]);
        this.dataSource.paginator = this.paginator;
        this.lastId = res[res.length - 1]['id_tipo'];
      }
    });
  }

  openUpdateWindow(tipo: Tipo): void {
    this.tipo = tipo;
    this.openForm();
  }

  openAddWindow(): void {
    this.tipo = new Tipo();
    this.openForm();
  }

  openDeleteWindow(tipo: Tipo): any {
    if (tipo.id_tipo != undefined && tipo.nombre_tipo != undefined) {
      this.openDelete(tipo.id_tipo, tipo.nombre_tipo);
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
          this.tipoService.eliminarTipo(result['id']).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha eliminado la tipo con exito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerTipoes();
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
    const dialogRef = this.dialog.open(FormTipoComponent, {
      width: '450px',
      data: this.tipo,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.authService.verifyAutentication().subscribe((res) => {
          if (!res) {
            this.authService.logout();
          }
        });

        if (result['id_tipo'] == undefined) {
          if (this.lastId != undefined) {
            this.tipo.id_tipo = this.lastId + 1;
          }
          this.tipoService.añadirTipo(this.tipo).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha agregado el tipo con éxito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerTipoes();
            } else {
              this._snackBar.open('Algo ha ocurrido, intentelo más tarde', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-warn'],
              });
            }
          });
        } else if (result['id_tipo'] > 0) {
          this.tipoService.modificarTipo(this.tipo).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha modificado el tipo con éxito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerTipoes();
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
