import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  
  public storage: Storage
  public noteCollection = 'noteCollection'
  public trashCollection = 'trashCollection'
  private trashCapacity = 10
  
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
  
  deleteNote(id:number){
    let noteCollection = this.get(this.noteCollection)
    let deletedNote = noteCollection[id]
    this.sendToTrash([deletedNote])
    noteCollection.splice(id,1)
    this.resetIDValues(noteCollection)
    this.set(this.noteCollection,noteCollection)
  }

  sendToTrash(noteCollection:any[]){
    let trashCollection = this.get(this.trashCollection)
    if (!trashCollection){
      trashCollection = []
    }
    trashCollection = trashCollection.concat(noteCollection).slice(0,this.trashCapacity)
    this.set(this.trashCollection,trashCollection)
  }
  
  resetIDValues(noteCollection:any){
    for (let i=0; i<noteCollection.length; i++){
      noteCollection[i]['id'] = i
    }
  }
  
}
