import { LocalStorageService } from './../services/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(public storage:LocalStorageService) { }

  ngOnInit(): void {
  }

  limpa(){
    this.storage.remove(this.storage.noteCollection)
    //this.atualiza()
  }

}
