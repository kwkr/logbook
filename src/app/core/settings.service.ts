import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

const projectOptionsKey = 'projectOptions';
const currentDuationKey = 'currentDuration';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private savedProjectsSubject: BehaviorSubject<any>;
  private currentDuration = 1800;
  private savedProjectsOptions = [];

  constructor(private storage: StorageService) {
    this.savedProjectsOptions = this.getProjectOptionsFromStorage();
    this.savedProjectsSubject = new BehaviorSubject(this.savedProjectsOptions);
    this.currentDuration = this.getCurrentDurationFromStore();
  }

  public getProjectOptions() {
    return this.savedProjectsSubject.asObservable();
  }

  public addProjectOption(newOption: string) {
    if (!newOption || newOption === '') {
      return;
    }
    this.savedProjectsOptions.push(newOption);
    this.storage.saveObjectToStorage(
      this.savedProjectsOptions,
      projectOptionsKey
    );
    this.savedProjectsSubject.next(this.savedProjectsOptions);
  }

  public removeFewProjectOptions(optionsTomRemove: string[]) {
    for (let k = this.savedProjectsOptions.length; k-- > 0; ) {
      const currentOption = this.savedProjectsOptions[k];
      if (optionsTomRemove.includes(currentOption)) {
        this.savedProjectsOptions.splice(k, 1);
      }
    }
    this.storage.saveObjectToStorage(
      this.savedProjectsOptions,
      projectOptionsKey
    );
    this.savedProjectsSubject.next(this.savedProjectsOptions);
  }

  public removeProjectOption(optionTomRemove: string) {
    for (let k = this.savedProjectsOptions.length; k-- > 0; ) {
      const currentOption = this.savedProjectsOptions[k];
      if (currentOption === optionTomRemove) {
        this.savedProjectsOptions.splice(k, 1);
        return;
      }
    }
    this.storage.saveObjectToStorage(
      this.savedProjectsOptions,
      projectOptionsKey
    );
    this.savedProjectsSubject.next(this.savedProjectsOptions);
  }

  private getProjectOptionsFromStorage() {
    let projectOptions: any = this.storage.getObjectFromStorage(
      projectOptionsKey
    );
    if (projectOptions === '' || projectOptions === null) {
      this.storage.saveObjectToStorage([], projectOptionsKey);
      projectOptions = [];
    }
    return projectOptions;
  }

  private getCurrentDurationFromStore() {
    const currentDuration: any = this.storage.getObjectFromStorage(
      currentDuationKey
    );
    if (currentDuration === '' || currentDuration === null) {
      this.storage.saveObjectToStorage(1800, currentDuationKey);
      return 1800;
    }
    return parseInt(currentDuration, 10);
  }

  public getCurrentDuration() {
    return this.currentDuration;
  }
}
