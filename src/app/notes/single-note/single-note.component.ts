import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss']
})
export class SingleNoteComponent implements OnInit {
  
  @Input() note?:any;
  @Input() styleTheme?:any;

  //implement media src
  //implement notificações e deadline

  @Output() changeEvent = new EventEmitter<string>();
  
  constructor(public storage:LocalStorageService) { }
  
  ngOnInit(): void {
    //this.setStyleColors()
  }

  setStyleColors(){
    Object.keys(this.note.themeColors).forEach(property => {
      document.documentElement.style.setProperty(`--${property}`, this.note.themeColors[property]);
    });
  }

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

  getEditLink(){return `/notes/edit/${this.note.id}`}

  deleteNote(){
    if (this.storage.deleteNote(this.note.id)){
      this.changeEvent.emit('true')
    }
  }

}
