import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogDataService {
  private todayLogsSubject: BehaviorSubject<any>;

  constructor() {
    this.todayLogsSubject = new BehaviorSubject(
      this.getCurrentItemsFromStorage()
    );
  }

  public putItemToStorage(task, description) {
    const todayKey = this.getTodaysTimestamp();
    let todayItem: any = localStorage.getItem(todayKey);
    if (!todayItem) {
      todayItem = {};
      todayItem[task] = [];
    } else {
      todayItem = JSON.parse(todayItem);
    }
    todayItem[task].push(description);
    localStorage.setItem(todayKey, JSON.stringify(todayItem));
    this.notifyOnNewLog();
  }

  private getCurrentItemsFromStorage() {
    const todayKey = this.getTodaysTimestamp();
    let todayItem: any = localStorage.getItem(todayKey);
    if (!todayItem) {
      todayItem = {};
      todayItem[''] = [];
    } else {
      todayItem = JSON.parse(todayItem);
    }
    return todayItem;
  }

  private notifyOnNewLog() {
    this.todayLogsSubject.next(this.getCurrentItemsFromStorage());
  }

  public getTodaysLogs() {
    return this.todayLogsSubject.asObservable();
  }

  private getTodaysTimestamp(): string {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    return String(todayDate.getTime());
  }

  public getLastProjectName(): string {
    const lastProjectName: any = localStorage.getItem('lastProjectName');
    if (!lastProjectName) {
      localStorage.setItem('lastProjectName', '');
      return '';
    }
    return lastProjectName;
  }

  public setLastProjectName(projectName: string): void {
    localStorage.setItem('lastProjectName', projectName);
  }

  public getLastTasktName(): string {
    const lastProjectName: any = localStorage.getItem('lastTaskName');
    if (!lastProjectName) {
      localStorage.setItem('lastTaskName', '');
      return '';
    }
    return lastProjectName;
  }
}
