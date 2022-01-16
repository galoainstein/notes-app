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

  getPinned(bool = true){
    let collection:any[] = []
    this.noteCollection?.forEach((note:any) => {
      if (note.pinned == bool){
        collection.push(note)
      }
    })
    return collection
  }

}
