import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ColorService } from './../../services/color.service';

import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent extends BaseFormComponent implements OnInit {

  inscricao?: Subscription;
  themeColor?: { [key: string]: any }  

  constructor(
    private route: ActivatedRoute,
    private readonly router: Router,
    private color: ColorService
  ) {
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

    this.setThemeColor(this.getFormControlValue('color'))
    
  }

  ngOnDestroy(){
    this.inscricao?.unsubscribe();
  }

  submit() {};

  // Form Functions

    deleteNote(){
      let id = this.getFormControlValue('id')
      if (id < this.storage.get(this.storage.noteCollection).length){
        this.storage.deleteNote(id)
      }
      this.router.navigate(['/notes'])
    }

    correctDateFormat(date:string){
      return date.slice(0, 3) + date[3].toUpperCase() + date.slice(4)
    }

    trySubmit(bool = true){
      if (!this.isFormBlank()) {
        const myDate = this.correctDateFormat(formatDate(new Date(), 'd MMM hh:mm', 'pt'));
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
        this.router.navigate(['/notes'])
      }
    }


  // Color Functions

    getColorNames = this.color.getNames

    setThemeColor(color:string){
      this.color.getThemes().forEach((element:any) => {
        if (element.name == color){
          this.themeColor = element.colors
          this.setFormControlValue("themeColors",this.themeColor)
          this.setFormControlValue("color",color)
        }
      });
      Object.keys(this.themeColor!).forEach(property => {
        document.documentElement.style.setProperty(`--${property}`, this.themeColor![property]);
      });
      this.selectColor(false)
    }

    selectColor(bool = true){
      var ctr = 0;
      var backdrop = document.getElementById("backdrop-color-darken")!
      if (bool){
        window.setTimeout(function(){
          backdrop.style.display = 'block';
          fadein();
        },0)
      } else {
        fadeout();
        window.setTimeout(function(){
          backdrop.style.display = 'none';
        },150)
      }

      function fadein(){
        backdrop.style.opacity = ctr !== 10 ? '0.'+ctr : '1';
        ctr++;
        if (ctr < 11)
          requestAnimationFrame(fadein);
        else
          ctr = 0;
      }

      function fadeout(){
        backdrop.style.opacity = '' + (1 - parseFloat('0.'+ctr));
        ctr++;
        
        if (ctr < 10)
          requestAnimationFrame(fadeout);
        else
          ctr = 0;
      }
      
      return true
    }

}
