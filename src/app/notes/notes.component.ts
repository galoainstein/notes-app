import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  noteCollection?: any[];

  constructor(public storage:LocalStorageService) { 
    window.addEventListener('storage', ()=>this.atualiza());
  }


  ngOnInit(): void {
    this.atualiza()
  }

  atualiza(){
    this.noteCollection = this.storage.get(this.storage.noteCollection);
  }

  clearNotes(){
    this.storage.remove(this.storage.noteCollection)
    this.atualiza()
  }

  receiveChange($event:any) {
    this.atualiza()
  }

}
