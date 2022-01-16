import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  noteCollection?: any[];
  //changeNotificator?:string;

  constructor(
    public storage:LocalStorageService,
    private data: DataService
  ) { 
    window.addEventListener('storage', ()=>this.atualiza());
    this.data.currentMessage.subscribe(changeNotificator => {
      if (changeNotificator){
        this.atualiza()
      }
    })
  }


  ngOnInit(): void {
    this.atualiza()
  }

  atualiza(){
    this.noteCollection = this.storage.get(this.storage.noteCollection);
  }

  receiveChange($event:any) {
    this.atualiza()
  }

  getFavs(bool = true){
    let collection:any[] = []
    this.noteCollection?.forEach((note:any) => {
      if (note.fav == bool){
        collection.push(note)
      }
    })
    return collection
  }

  childThemes(id:number){
    let css = `
    --background: ${this.noteCollection![id]["themeColors"]["background"]};
    --background-secundary: ${this.noteCollection![id]["themeColors"]["background-secundary"]};
    --primary: ${this.noteCollection![id]["themeColors"]["primary"]};
    --secundary: ${this.noteCollection![id]["themeColors"]["secundary"]}
    `;
    return css
  }

}
