import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { StorageService } from './core/storage.service';
import { WindowOpenerService } from './core/window-opener.service';

const initialQUestionKey = 'initialQuestion';

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
    const wasUnlocked = this.storage.getObjectFromStorage(initialQUestionKey);
    if (wasUnlocked === null) {
      setTimeout(() => {
        this.windowService.openPermissionWindow();
        this.openDialog();
      }, 500);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.storage.saveObjectToStorage('done', initialQUestionKey);
    });
  }
}
