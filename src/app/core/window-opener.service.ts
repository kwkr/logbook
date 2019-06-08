import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogDataService } from './log-data.service';

@Injectable({
  providedIn: 'root'
})
export class WindowOpenerService {
  constructor(
    private http: HttpClient,
    private logDataService: LogDataService
  ) {}

  public openNewWindowWithReminder(): void {
    this.http
      .get<any>('assets/dialog-template/dialog.html', {
        responseType: 'text' as 'json'
      })
      .subscribe(data => {
        const myWindow = window.open('', '', 'width=400,height=200');
        myWindow['lastTaskName'] = this.logDataService.getLastProjectName();
        myWindow.document.write(data);
        myWindow['transferData'] = (task, description) => {
          setTimeout(() => {
            this.logDataService.putItemToStorage(task, description);
          }, 10);
        };
      });
  }
}
