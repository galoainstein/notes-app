import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  themeColor?: { [key: string]: any }
  hovered?: any
  

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

    this.setThemeColor(this.getFormControlValue('color'))
    
  }

  getColorNames(){
    var array: {value:any, label:any, style:any, pressedStyle:any}[] = []
    colorThemes.forEach((element:any) => {
      var name = element.name
      var theme = element.colors
      array.push({
        value: name,
        label: name[0].toUpperCase() + name.slice(1),
        style: this.styleCSS(theme),
        pressedStyle: this.styleCSS(theme,true)
      })
    })
    return array
  }

  styleCSS(theme:{background:any, "background-secundary":any, primary:any, secundary:any}, pressed=false){
    if (pressed){
      return {"background": theme.primary, "color": theme.background}
    }
    return {"background": theme["background-secundary"], "color": theme.primary}
  }

  setThemeColor(color:string){
    colorThemes.forEach((element:any) => {
      if (element.name == color){
        this.themeColor = element.colors
        this.setFormControlValue("themeColors",this.themeColor)
      }
    });
    Object.keys(this.themeColor!).forEach(property => {
      document.documentElement.style.setProperty(`--${property}`, this.themeColor![property]);
    });
    this.selectColor(false)
  }

  ngOnDestroy(){
    this.inscricao?.unsubscribe();
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
      //backdrop.style.transform = 'scale('+(1 - ('0.'+ctr))+')';
      ctr++;
      
      if (ctr < 10)
        requestAnimationFrame(fadeout);
      else
        ctr = 0;
    }
    
    return true
  }

  

}
