import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogDataService } from './log-data.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowOpenerService {
  private filledLogSubject: Subject<void> = new Subject();

  constructor(
    private http: HttpClient,
    private logDataService: LogDataService
  ) {}

  public openNewWindowWithReminder(duration: number): void {
    this.http
      .get<any>('assets/dialog-template/dialog.html', {
        responseType: 'text' as 'json'
      })
      .subscribe(data => {
        const myWindow = window.open('', '', 'width=400,height=200');
        myWindow['lastTaskName'] = this.logDataService.getLastTaskName();
        myWindow.document.write(data);
        myWindow.focus();
        myWindow['transferData'] = (task, description) => {
          setTimeout(() => {
            if (duration === 0) {
              this.logDataService.putLogToStorageWithDefaultDuration(
                task,
                description
              );
            } else {
              this.logDataService.putLogToStorageWithCustomDuration(
                task,
                description,
                duration
              );
            }
            this.filledLogSubject.next();
          }, 10);
        };
      });
  }

  public openPermissionWindow() {
    return new Promise((resolve, reject) => {
      const myWindow = window.open('', '', 'width=0,height=0');
      if (myWindow === null) {
        reject();
      } else {
        resolve();
        myWindow.blur();
        window.focus();
        myWindow.close();
      }
    });
  }

  public notifyOnFilled() {
    return this.filledLogSubject.asObservable();
  }
}
