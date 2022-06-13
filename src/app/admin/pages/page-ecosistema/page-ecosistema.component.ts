import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Ecosistema } from 'src/app/models/Ecosistema';
import { DeleteComponent } from '../../forms/delete/delete.component';
import { FormEcosistemaComponent } from '../../forms/form-ecosistema/form-ecosistema.component';
import { EcosistemaService } from '../../services/ecosistema.service';

@Component({
  selector: 'app-page-ecosistema',
  templateUrl: './page-ecosistema.component.html',
  styleUrls: ['./page-ecosistema.component.css']
})
export class PageEcosistemaComponent implements OnInit, AfterViewInit {
  ecosistema: Ecosistema = new Ecosistema();
  lastId: number | undefined;

  displayedColumns: string[] = [
    'ID',
    'NOMBRE',
  ];
  dataSource = new MatTableDataSource<Ecosistema>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator | null;

  constructor(
    private ecosistemaService: EcosistemaService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerEcosistemaes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  obtenerEcosistemaes() {
    this.ecosistemaService.obtenerEcosistemas().subscribe((res: any) => {
      if (Array.isArray(res)) {
        this.dataSource = new MatTableDataSource<Ecosistema>([...res]);
        this.dataSource.paginator = this.paginator;
        this.lastId = res[res.length - 1]['id_ecosistema'];
      }
    });
  }

  openUpdateWindow(ecosistema: Ecosistema): void {
    this.ecosistema = ecosistema;
    this.openForm();
  }

  openAddWindow(): void {
    this.ecosistema = new Ecosistema();
    this.openForm();
  }

  openDeleteWindow(ecosistema: Ecosistema): any {
    if (ecosistema.id_ecosistema != undefined && ecosistema.nombre_ecosistema != undefined) {
      this.openDelete(ecosistema.id_ecosistema, ecosistema.nombre_ecosistema);
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
          this.ecosistemaService.eliminarEcosistema(result['id']).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha eliminado el ecosistema con exito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerEcosistemaes();
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
    const dialogRef = this.dialog.open(FormEcosistemaComponent, {
      width: '450px',
      data: this.ecosistema,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.authService.verifyAutentication().subscribe((res) => {
          if (!res) {
            this.authService.logout();
          }
        });

        if (result['id_ecosistema'] == undefined) {
          if (this.lastId != undefined) {
            this.ecosistema.id_ecosistema = this.lastId + 1;
          }
          this.ecosistemaService.añadirEcosistema(this.ecosistema).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha agregado el ecosistema con éxito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerEcosistemaes();
            } else {
              this._snackBar.open('Algo ha ocurrido, intentelo más tarde', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-warn'],
              });
            }
          });
        } else if (result['id_ecosistema'] > 0) {
          this.ecosistemaService.modificarEcosistema(this.ecosistema).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha modificado el ecosistema con éxito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerEcosistemaes();
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
