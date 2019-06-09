import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

const projectOptionsKey = 'projectOptions';

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
  }

  private getProjectOptionsFromStorage() {
    let projectOptions: any = this.storage.getObjectFromStorage(
      projectOptionsKey
    );
    if (projectOptions === '') {
      projectOptions = [];
    }
    return projectOptions;
  }

  public getCurrentDuration() {
    return this.currentDuration;
  }
}
