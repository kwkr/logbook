import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Log {
  ts: number;
  description: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class LogDataService {
  private todayLogsSubject: BehaviorSubject<any>;
  private currentDuration = 1800;

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
      if (!todayItem[task]) {
        todayItem[task] = [];
      }
    }
    const newLog: Log = {
      description: description,
      ts: new Date().getTime(),
      duration: this.currentDuration
    };
    todayItem[task].push(newLog);
    localStorage.setItem(todayKey, JSON.stringify(todayItem));
    this.updateLastTaskNameIfChanged(task);
    this.notifyOnNewLog();
  }

  private getCurrentItemsFromStorage() {
    const todayKey = this.getTodaysTimestamp();
    let todayItem: any = localStorage.getItem(todayKey);
    if (!todayItem) {
      todayItem = {};
      todayItem[todayKey] = [];
    } else {
      todayItem = JSON.parse(todayItem);
    }
    return todayItem;
  }

  private notifyOnNewLog() {
    const data = this.getCurrentItemsFromStorage();
    this.todayLogsSubject.next(data);
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
    const lastProjectName: any = localStorage.getItem('lastTaskName');
    if (!lastProjectName) {
      localStorage.setItem('lastTaskName', '');
      return '';
    }
    return lastProjectName;
  }

  public updateLastTaskNameIfChanged(projectName: string): void {
    const currentName = localStorage.getItem('lastTaskName');
    if (currentName !== projectName) {
      localStorage.setItem('lastTaskName', projectName);
    }
  }

  public setLastProjectName(projectName: string): void {
    localStorage.setItem('lastTaskName', projectName);
  }

  public getLastTasktName(): string {
    const lastProjectName: any = localStorage.getItem('lastTaskName');
    if (!lastProjectName) {
      localStorage.setItem('lastTaskName', '');
      return '';
    }
    return lastProjectName;
  }

  public getCurrentDuration() {
    return this.currentDuration;
  }
}
