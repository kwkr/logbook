import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<InfoDialogComponent>) {}

  ngOnInit() {}

  click() {
    this.dialogRef.close();
  }
}
