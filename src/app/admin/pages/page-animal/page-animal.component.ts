import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Animal } from 'src/app/models/Animal';
import { DeleteComponent } from '../../forms/delete/delete.component';
import { FormAnimalComponent } from '../../forms/form-animal/form-animal.component';
import { AnimalService } from '../../services/animal.service';
import { EspecieService } from '../../services/especie.service';

@Component({
  selector: 'app-page-animal',
  templateUrl: './page-animal.component.html',
  styleUrls: ['./page-animal.component.css'],
})
export class PageAnimalComponent implements OnInit, AfterViewInit {
  animal: Animal = new Animal();
  lastId: number | undefined;

  displayedColumns: string[] = [
    'ID',
    'NOMBRE',
    'CONSERVACIÓN',
    'DIETA',
    'REPRODUCCION',
    'ADAPTACIÓN',
    'AMENAZAS',
    'ESPECIE',
    'ZONA',
    'ECOSISTEMA',
    'ACCIONES'
  ];
  dataSource = new MatTableDataSource<Animal>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator | null;

  constructor(
    private animalService: AnimalService,
    private especieService: EspecieService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerAnimales();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  obtenerAnimales() {
    this.animalService.obtenerAnimales().subscribe((res: any) => {
      if (Array.isArray(res)) {
        this.dataSource = new MatTableDataSource<Animal>([...res]);
        this.dataSource.paginator = this.paginator;
        this.lastId = res[res.length - 1]['id_animal'];
      }
    });
  }

  openUpdateWindow(animal: Animal): void {
    this.animal = animal;
    this.openForm();
  }

  openAddWindow(): void {
    this.animal = new Animal();
    this.openForm();
  }

  openDeleteWindow(animal: Animal): any {
    if (animal.id_animal != undefined && animal.nombre_animal != undefined) {
      this.openDelete(animal.id_animal, animal.nombre_animal);
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
          this.animalService.eliminarAnimal(result['id']).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha eliminado el animal con exito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerAnimales();
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
    const dialogRef = this.dialog.open(FormAnimalComponent, {
      width: '450px',
      data: this.animal,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.authService.verifyAutentication().subscribe((res) => {
          if (!res) {
            this.authService.logout();
          }
        });

        if (result['id_animal'] == undefined) {
          if (this.lastId != undefined) {
            this.animal.id_animal = this.lastId + 1;
          }
          this.animalService.añadirAnimal(this.animal).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha agregado el animal con éxito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerAnimales();
            } else {
              this._snackBar.open('Algo ha ocurrido, intentelo más tarde', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-warn'],
              });
            }
          });
        } else if (result['id_animal'] > 0) {
          this.animalService.modificarAnimal(this.animal).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open('Se ha modificado el animal con éxito', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              });
              this.obtenerAnimales();
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
