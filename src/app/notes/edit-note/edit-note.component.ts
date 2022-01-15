import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LocalStorageService } from 'src/app/services/local-storage.service';

import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent extends BaseFormComponent implements OnInit {

  
  inscricao?: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    super(new LocalStorageService);
   }

  ngOnInit(): void {

    this.inscricao = this.route.params.subscribe(
      (params: any) => {this.idParam = params['id'];}
    );

    this.formulario = this.formBuilder.group({
      id: [this.setID()],
      title: [null],
      description: [null],
      tasks: [[]],
      tags: [[]],
      color: ['#ffffff'],
      pinned: [false],
      createdAt: [null]
    });
    
    if (this.idParam != 'new'){
      this.setFormByID(this.getFormControlValue('id'))
    }
    
  }

  ngOnDestroy(){
    this.inscricao?.unsubscribe();
  }

  checkValidations(){
    this.formulario.markAllAsTouched();
    //this.resetForm()
    //Not implemented
    //this.onSubmit()
  }

  correctDateFormat(date:string){
    return `${date.slice(0, 2)} ${date[3].toUpperCase()}${date.slice(4, 6)}`
  }

  submit() {};

  trySubmit(){
    if (!this.isFormBlank()) {
      const myDate = this.correctDateFormat(formatDate(new Date(), 'd MMM', 'pt'));
      this.setFormControlValue('createdAt', myDate)
      this.setID()
      this.sendToServer()
    } else {
      alert('Para criar uma nota, é necessário ter um título, uma descrição ou uma task!');
    }
  }

  sendToServer(){
    var noteCollection:any = this.storage.get(this.storage.noteCollection)
    if (this.getFormControlValue('id') > noteCollection.length){
      noteCollection.push(this.formulario.value)
    } else {
      noteCollection[this.getFormControlValue('id')] = this.formulario.value
    }
    this.storage.set(this.storage.noteCollection,noteCollection)
    window.location.pathname = '/notes';
  }

}
