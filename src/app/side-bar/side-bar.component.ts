import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';

import { LocalStorageService } from './../services/local-storage.service';
import { DataService } from '../services/data.service';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  getColorNames = this.color.getNames
  getStyleColors = this.color.getStyleColors
  

  constructor(
    public storage:LocalStorageService,
    private data: DataService,
    private color: ColorService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    const deleteBtn: any = document.querySelector('#delete-all-btn')
    fromEvent(deleteBtn, 'click').subscribe(() =>  this.limpa());
  }

  updateNotes() {
    this.data.changeMessage("true")
  }

  limpa(){
    this.storage.remove(this.storage.noteCollection)
    this.updateNotes()
  }

  isSelected(path = '/notes'){
    if(window.location.pathname == path){
      return "selected"
    }
    return ""
  }

  view(colorName: string){
    this.router.navigate(['/notes/color/'+colorName])
  }

  getNoteCollection(){
    return this.storage.get(this.storage.noteCollection)
  }
}
