import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  trashCapacity = this.storage.trashCapacity

  constructor(
    public storage:LocalStorageService
  ) { }

  ngOnInit(): void {}

  getNotes(){
    return this.storage.get(this.storage.trashCollection)
  }

  restore(note: any, id: number){
    let noteCollection = this.storage.get(this.storage.noteCollection)
    noteCollection.push(note)
    this.storage.resetIDValues(noteCollection)
    this.storage.set(this.storage.noteCollection,noteCollection)
    let trashCollection = this.getNotes()
    trashCollection.splice(id,1)
    this.storage.set(this.storage.trashCollection,trashCollection)
  }

  cleanTrash(){
    if (confirm("Tem certeza que deseja esvaziar a lixeira? Esta ação é irreversível!")){
      this.storage.set(this.storage.trashCollection,[])
    }
  }

}
