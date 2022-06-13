import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ZonaExhibicion } from 'src/app/models/ZonaExhibicion';
import { DeleteComponent } from '../../forms/delete/delete.component';
import { FormZonaComponent } from '../../forms/form-zona/form-zona.component';
import { ZonaExhibicionService } from '../../services/zona-exhibicion.service';

@Component({
  selector: 'app-page-zona',
  templateUrl: './page-zona.component.html',
  styleUrls: ['./page-zona.component.css']
})
export class PageZonaComponent implements OnInit, AfterViewInit {
  zona: ZonaExhibicion = new ZonaExhibicion();
  lastId: number | undefined;

  displayedColumns: string[] = [
    'ID',
    'NOMBRE',
    'HORARIO',
  ];
  dataSource = new MatTableDataSource<ZonaExhibicion>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator | null;

  constructor(
    private zonaService: ZonaExhibicionService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerZonaExhibiciones();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  obtenerZonaExhibiciones() {
    this.zonaService.obtenerZonaExhibiciones().subscribe((res: any) => {
      if (Array.isArray(res)) {
        this.dataSource = new MatTableDataSource<ZonaExhibicion>([...res]);
        this.dataSource.paginator = this.paginator;
        this.lastId = res[res.length - 1]['id_zona'];
      }
    });
  }

  openUpdateWindow(zona: ZonaExhibicion): void {
    this.zona = zona;
    this.openForm();
  }

  openAddWindow(): void {
    this.zona = new ZonaExhibicion();
    this.openForm();
  }

  openDeleteWindow(zona: ZonaExhibicion): any {
    if (zona.id_zona != undefined && zona.nombre_zona != undefined) {
      this.openDelete(zona.id_zona, zona.nombre_zona);
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
          this.zonaService.eliminarZonaExhibicion(result['id']).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha eliminado la zona con exito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerZonaExhibiciones();
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
    const dialogRef = this.dialog.open(FormZonaComponent, {
      width: '450px',
      data: this.zona,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.authService.verifyAutentication().subscribe((res) => {
          if (!res) {
            this.authService.logout();
          }
        });

        if (result['id_zona'] == undefined) {
          if (this.lastId != undefined) {
            this.zona.id_zona = this.lastId + 1;
          }
          this.zonaService.añadirZonaExhibicion(this.zona).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha agregado el zona con éxito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerZonaExhibiciones();
            } else {
              this._snackBar.open('Algo ha ocurrido, intentelo más tarde', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-warn'],
              });
            }
          });
        } else if (result['id_zona'] > 0) {
          this.zonaService.modificarZonaExhibicion(this.zona).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha modificado el zona con éxito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerZonaExhibiciones();
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
