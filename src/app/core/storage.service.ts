import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  public saveObjectToStorage(object: any, key: string) {
    localStorage.setItem(key, JSON.stringify(object));
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
