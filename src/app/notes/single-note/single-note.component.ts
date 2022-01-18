import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss']
})
export class SingleNoteComponent implements OnInit {
  
  @Input() note?:any;

  @Output() changeEvent = new EventEmitter<string>();

  deleteBtn = document.getElementById("delete-btn")
  onDeleteBtn = false
  editBtn = document.getElementById("delete-btn")
  
  constructor(
    public storage:LocalStorageService,
    private readonly router: Router
  ) {
    this.deleteBtn?.addEventListener('mouseenter',()=>{
      this.onDeleteBtn = true
      console.log(this.onDeleteBtn)
    })
    this.deleteBtn?.addEventListener('mouseleave',()=>{
      this.onDeleteBtn = false
      console.log(this.onDeleteBtn)
    })
  }
  
  ngOnInit(): void {}

  getStyleColors(){
    let theme = this.note.themeColors
    let css = ""
    Object.keys(theme).forEach(property => {
      css += `--${property}: ${theme[property]};`
    });
    return css
  }

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
