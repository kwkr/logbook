import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { StorageService } from './core/storage.service';
import { WindowOpenerService } from './core/window-opener.service';

const firstLoadKey = 'firstLoad';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private storage: StorageService,
    private windowService: WindowOpenerService
  ) {}

  ngOnInit() {
    const questionAsked = this.storage.getObjectFromStorage(firstLoadKey);
    if (questionAsked === null) {
      this.windowService
        .openPermissionWindow()
        .then(() => {})
        .catch(() => {
          setTimeout(() => {
            this.openDialog();
          }, 500);
        });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.storage.saveObjectToStorage('yes', firstLoadKey);
    });
  }
}
