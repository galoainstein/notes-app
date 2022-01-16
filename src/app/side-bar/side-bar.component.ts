import { LocalStorageService } from './../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(
    public storage:LocalStorageService,
    private data: DataService
  ) { }

  ngOnInit(): void {
  }

  updateNotes() {
    this.data.changeMessage("true")
  }

  limpa(){
    this.storage.remove(this.storage.noteCollection)
    this.updateNotes()
    //this.atualiza()
  }

  isSelected(path = '/notes'){
    if(window.location.pathname == path){
      return "selected"
    }
    return ""
  }

}
