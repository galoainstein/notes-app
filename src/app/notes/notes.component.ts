import { LocalStorageService } from './../services/local-storage.service';
import { Component, ContentChild, Input, OnInit } from '@angular/core';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  

  //localStorage.set('first',{print: 'hello world'})


  //noteCollection?:any

  noteCollection:any = localStorage.getItem('noteCollection');

  constructor() { }

  ngOnInit(): void {
    this.atualiza()
  }

  atualiza(){
    console.log(this.noteCollection)
    this.noteCollection = JSON.parse(this.noteCollection);
    console.log(this.noteCollection)
  }

  limpa(){
    localStorage.clear()
  }
  /*getNoteCollection(){
    if (localStorage.getItem('note-collection')){
      this.noteCollection = JSON.parse(localStorage.getItem('note-collection'))
    }
  }*/

}
