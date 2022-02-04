import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss']
})
export class SingleNoteComponent implements OnInit {
  
  @Input() note?:any;

  @Output() changeEvent = new EventEmitter<string>();

  onDeleteBtn = false
  getStyleColors = this.color.getStyleColors
  
  constructor(
    public storage:LocalStorageService,
    private color: ColorService,
    private readonly router: Router
  ) { }
  
  ngOnInit(): void {}

  getTasks(completed = false){
    var listTasksNames = []
    if (this.note.tasks){
      for (var i = 0; i<this.note.tasks.length; i++){
        if (this.note.tasks[i].completed == completed){
          listTasksNames.push(this.note.tasks[i].name)
        }
        
      }
    }
    return listTasksNames
  }

  getEditLink(){return `/notes/edit/${this.note.id}`}

  deleteNote(){
    this.storage.deleteNote(this.note.id)
    this.changeEvent.emit('true')
  }

}
