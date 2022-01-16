import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss']
})
export class SingleNoteComponent implements OnInit {
  
  @Input() note?:any;

  //implement media src
  //implement notificações e deadline

  @Output() changeEvent = new EventEmitter<string>();
  
  constructor(public storage:LocalStorageService) { }
  
  ngOnInit(): void {
    
  }

  getID(){return this.note.id}
  getTitle(){return this.note.title}
  getDescription(){return this.note.description}
  getTasks(){
    var listTasksNames = []
    if (this.note.tasks){
      for (var i = 0; i<this.note.tasks.length; i++){
        listTasksNames.push(this.note.tasks[i].name)
      }
    }
    return listTasksNames
  }
  getTags(){
    var listTagsNames = []
    if (this.note.tags){
      for (var i = 0; i<this.note.tags.length; i++){
        listTagsNames.push(this.note.tags[i].name)
      }
    }
    return listTagsNames
  }
  getColor(){return "red"}
  getPinned(){return this.note.pinned}
  getCreatedAt(){return this.note.createdAt}

  getEditLink(){return `notes/edit/${this.getID()}`}

  redirectToEdit(){window.location.pathname = this.getEditLink()}

  deleteNote(){
    let noteCollection = this.storage.get(this.storage.noteCollection)
    delete noteCollection[this.getID()]
    noteCollection = noteCollection.filter((note:any) => note!=null)
    this.resetIDValues(noteCollection)
    this.storage.set(this.storage.noteCollection,noteCollection)
    this.changeEvent.emit('true')
  }


  resetIDValues(noteCollection:any){
    for (let i=0; i<noteCollection.length; i++){
      noteCollection[i]['id'] = i
    }
  }
  
}
