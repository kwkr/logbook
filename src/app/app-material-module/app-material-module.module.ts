import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class AppMaterialModuleModule {}
