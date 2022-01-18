import { Component, Input, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  @Input() filter = [false, ""]

  noteCollection?: any[];

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


  ngOnInit(): void {this.atualiza()}

  atualiza(){
    this.noteCollection = this.storage.get(this.storage.noteCollection);
  }

  receiveChange($event:any) {
    this.atualiza()
  }

  getFavs(filter: any[], bool = true){
    let collection:any[] = []
    this.noteCollection?.forEach((note:any) => {
      if (note.fav == bool){
        if (filter[0]){
          if(note.color == filter[1]){
            collection.push(note)
          }
        } else {
          collection.push(note)
        }
      }
    })
    return collection
  }

}
