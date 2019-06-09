import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SettingsService } from './settings.service';
import { StorageService } from './storage.service';

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

  constructor(
    private settingsService: SettingsService,
    private storage: StorageService
  ) {
    this.todayLogsSubject = new BehaviorSubject(
      this.getCurrentItemsFromStorage()
    );
  }

  public putLogToStorageWithDefaultDuration(task, description) {
    this.putLogToStorageWithCustomDuration(
      task,
      description,
      this.settingsService.getCurrentDuration()
    );
  }

  public putLogToStorageWithCustomDuration(task, description, duration) {
    const todayKey = this.getTodaysTimestamp();
    let todayItem: any = this.storage.getObjectFromStorage(todayKey);
    if (!todayItem) {
      todayItem = {};
      todayItem[task] = [];
    }
    if (!todayItem[task]) {
      todayItem[task] = [];
    }
    const newLog: Log = {
      description: description,
      ts: new Date().getTime(),
      duration: duration
    };
    todayItem[task].push(newLog);
    this.saveObjectToStorage(todayItem, todayKey);
    this.updateLastTaskNameIfChanged(task);
    this.notifyOnNewLog();
  }

  private getCurrentItemsFromStorage() {
    const todayKey = this.getTodaysTimestamp();
    let todayItem: any = this.storage.getObjectFromStorage(todayKey);
    if (!todayItem) {
      todayItem = {};
      todayItem[todayKey] = [];
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

  public getLastTaskName(): string {
    const lastTaskName: any = this.storage.getObjectFromStorage(
      lastTaskNameKey
    );
    if (!lastTaskName) {
      this.saveObjectToStorage('', lastTaskNameKey);
      return '';
    }
    return lastTaskName;
  }

  public updateLastTaskNameIfChanged(newTaskName: string): void {
    const currentName = this.storage.getObjectFromStorage(lastTaskNameKey);
    if (currentName !== newTaskName) {
      this.saveObjectToStorage(newTaskName, lastTaskNameKey);
    }
  }

  public setLastProjectName(projectName: string): void {
    this.storage.saveObjectToStorage(projectName, lastTaskNameKey);
  }

  public getLastTasktName(): string {
    const lastProjectName: any = this.storage.getObjectFromStorage(
      lastTaskNameKey
    );
    if (!lastProjectName) {
      this.storage.saveObjectToStorage('', lastTaskNameKey);
      return '';
    }
    return lastProjectName;
  }

  private saveObjectToStorage(object: any, key: string) {
    this.storage.saveObjectToStorage(object, key);
  }
}
