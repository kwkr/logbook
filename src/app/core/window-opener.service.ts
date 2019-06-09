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

  public openNewWindowWithReminder(): void {
    this.http
      .get<any>('assets/dialog-template/dialog.html', {
        responseType: 'text' as 'json'
      })
      .subscribe(data => {
        const myWindow = window.open('', '', 'width=400,height=200');
        myWindow['lastTaskName'] = this.logDataService.getLastProjectName();
        myWindow.document.write(data);
        myWindow.focus();
        myWindow['transferData'] = (task, description) => {
          setTimeout(() => {
            this.logDataService.putItemToStorage(task, description);
            this.filledLogSubject.next();
          }, 10);
        };
      });
  }

  public openPermissionWindow() {
    try {
      const myWindow = window.open('', '', 'width=50,height=50');
      myWindow.close();
    } catch (e) {}
  }

  public notifyOnFilled() {
    return this.filledLogSubject.asObservable();
  }
}
