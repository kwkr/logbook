import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Log {
  ts: number;
  description: string;
  duration: number;
}

const lastTaskNameKey = 'lastTaskName';

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
    const lastProjectName: any = localStorage.getItem(lastTaskNameKey);
    if (!lastProjectName) {
      localStorage.setItem(lastTaskNameKey, '');
      return '';
    }
    return lastProjectName;
  }

  public updateLastTaskNameIfChanged(projectName: string): void {
    const currentName = localStorage.getItem(lastTaskNameKey);
    if (currentName !== projectName) {
      localStorage.setItem(lastTaskNameKey, projectName);
    }
  }

  public setLastProjectName(projectName: string): void {
    localStorage.setItem(lastTaskNameKey, projectName);
  }

  public getLastTasktName(): string {
    const lastProjectName: any = localStorage.getItem(lastTaskNameKey);
    if (!lastProjectName) {
      localStorage.setItem(lastTaskNameKey, '');
      return '';
    }
    return lastProjectName;
  }

  public getCurrentDuration() {
    return this.currentDuration;
  }
}
