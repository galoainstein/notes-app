import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  private storage: Storage
  public noteCollection = 'noteCollection'
  public tagCollection = 'tagCollection'

  constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get(key: string): any[] {
    if (this.storage){
      return JSON.parse(this.storage.getItem(key) || '[]');
    }
    return [];
  }

  remove(key: string): boolean {
    if (confirm("Certeza que deseja apagar todas as notas? Esta ação não pode ser desfeita")){
      if (this.storage) {
        this.storage.removeItem(key);
        return true;
      }
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }

}
