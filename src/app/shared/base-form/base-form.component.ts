import { Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LocalStorageService } from 'src/app/services/local-storage.service';

@Directive()
export abstract class BaseFormComponent {

  formulario = new FormGroup({});
  inputArrayItem?: any; // used later on this.addToFormControlArray to get input value of array form elements
  idParam?: string;

  constructor(
    public formBuilder: FormBuilder,
    public storage:LocalStorageService
  ) { }

  abstract submit(): any;

  onSubmit() {}

  resetForm() {
    this.formulario = this.formBuilder.group({
      id: [this.setID()],
      title: [null],
      description: [null],
      tasks: [[]],
      color: ["white"],
      themeColors: [{
        "background": "#fff",
        "background-secundary": "#efefef",
        "primary": "#777777",
        "secundary": "#b2b2b2"
      }],
      fav: [false],
      createdAt: [null]
    });
  }

  isFieldBlank(fieldValue:any){
    return fieldValue == null || fieldValue == "" || fieldValue == []
  }

  isFormBlank(){
    const requiredFields = ["title", "description", "tasks"]
    let validation: boolean[] = []
    requiredFields.forEach(formControl => {
      validation.push(this.isFieldBlank(this.getFormControlValue(formControl)))
    })
    return validation.every(bool => bool)
  }

  setID():any{
    let id:any
    if (this.idParam == 'new'){
      let noteCollection = this.storage.get(this.storage.noteCollection)
      id = noteCollection.length
    } else {
      id = this.idParam
    }
    return parseInt(id)
  }

  setFormByID(id:number){
    let form = this.storage.get(this.storage.noteCollection)[id];
    
    Object.keys(this.formulario.controls).forEach(formControl => {
      if (formControl != 'id'){
        this.setFormControlValue(formControl, form[formControl]);
      }
    })
  }

  fav(){this.setFormControlValue('fav',!this.getFormControlValue('fav'))}

  isFav(){return this.getFormControlValue('fav')}

  getFormControlValue(formControl:string) {return this.formulario.controls[formControl].value}

  setFormControlValue(formControl:string, value:any) {this.formulario.controls[formControl].setValue(value)}

}
