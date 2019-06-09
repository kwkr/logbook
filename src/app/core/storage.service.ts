import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  public saveObjectToStorage(object: any, key: string) {
    localStorage.setItem(key, JSON.stringify(object));
  }

  public getAllLogs() {
    const len = localStorage.length;
    const objectToReturn = {};
    for (let k = 0; k < len; k++) {
      const key = localStorage.key(k);
      if (this.isNumeric(key)) {
        objectToReturn[key] = this.getObjectFromStorage(key);
      }
    }
    return objectToReturn;
  }

  private isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  public getObjectFromStorage(key: string) {
    const itemFromStorage = localStorage.getItem(key);
    try {
      return JSON.parse(itemFromStorage);
    } catch (e) {
      console.log('item is not a json');
    }
    if (!itemFromStorage) {
      console.log('item is undefined, returning empty string');
      return '';
    }
    return itemFromStorage;
  }
}
