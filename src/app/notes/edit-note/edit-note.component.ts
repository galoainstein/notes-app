import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LocalStorageService } from 'src/app/services/local-storage.service';

import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

import colorThemes from 'src/app/shared/color-themes/color.themes.json'

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent extends BaseFormComponent implements OnInit {

  inscricao?: Subscription;
  themeColor? : { [key: string]: any }
  

  constructor(private route: ActivatedRoute,) {
    super(
      new FormBuilder,
      new LocalStorageService
    );
   }

  ngOnInit(): void {

    this.inscricao = this.route.params.subscribe(
      (params: any) => {this.idParam = params['id'];}
    );

    this.resetForm()
    
    if (this.idParam != 'new'){
      this.setFormByID(this.getFormControlValue('id'))
    }

    this.setThemeColor()
    
  }

  setThemeColor(){
    colorThemes.forEach((element:any) => {
      if (element.name == this.getFormControlValue('color')){
        this.themeColor = element.colors
        this.setFormControlValue("themeColors",this.themeColor)
      }
    });
    Object.keys(this.themeColor!).forEach(property => {
      document.documentElement.style.setProperty(`--${property}`, this.themeColor![property]);
    });
    //console.log(this.themePurple["background"])
    //Object.keys(this.themePurple).forEach(property => {console.log(property)});
    //console.log(1,window.getComputedStyle(document.documentElement).getPropertyValue('--background'));
    // document.documentElement.style.setProperty("--background", this.themePurple["background"]);
    // document.documentElement.style.setProperty("--background-secundary", this.themePurple["background-secundary"]);
    // document.documentElement.style.setProperty("--primary", this.themePurple["primary"]);
    // document.documentElement.style.setProperty("--secundary", this.themePurple["secundary"]);
  }

  //getTeste(param:string){return this.themePurple[param]}

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

  trySubmit(bool = true){
    if (!this.isFormBlank()) {
      const myDate = this.correctDateFormat(formatDate(new Date(), 'd MMM', 'pt'));
      this.setFormControlValue('createdAt', myDate)
      this.setID()
      this.sendToServer(bool)
    } else {
      alert('Para criar uma nota, é necessário ter um título, uma descrição ou uma task!');
    }
  }

  sendToServer(bool: boolean){
    var noteCollection:any = this.storage.get(this.storage.noteCollection)
    if (this.getFormControlValue('id') > noteCollection.length){
      noteCollection.push(this.formulario.value)
    } else {
      noteCollection[this.getFormControlValue('id')] = this.formulario.value
    }
    this.storage.set(this.storage.noteCollection,noteCollection)
    if (bool){
      window.location.pathname = '/notes';
    }
  }

}
