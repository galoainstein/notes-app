import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive()
export abstract class BaseFormComponent {

  formulario: FormGroup = new FormGroup({});
  inputArrayItem?: any; // used later on this.addToFormControlArray to get input value of array form elements

  constructor() { }

  abstract submit(): any;

  onSubmit() {}

  resetar() {
    Object.keys(this.formulario.controls).forEach(formControl => {
      const type:string = Object.prototype.toString.call(this.getFormControlValue(formControl))
      if (type == '[object Array]'){
        this.setFormControlValue(formControl,[])
      } else if (type == '[object Boolean]'){
        this.setFormControlValue(formControl,false)
      } else if (formControl == 'color'){
        this.setFormControlValue(formControl,'#ffffff')
      } else {
        this.setFormControlValue(formControl,null)
      }
    });
    //this.formulario.reset();
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

  addToFormControlArray(formControl: string, inputID: string){
    console.log(formControl);
    console.log(inputID)
    this.inputArrayItem = document.getElementById(inputID)
    const inputValue:string = this.inputArrayItem.value
    if (!this.isFieldBlank(inputValue)){
      var object = {}
      if (formControl == 'tasks'){
        object = {
          id: this.getFormControlValue(formControl).length,
          name: inputValue,
          completed: false
        }
      } else {
        object = {
          id: this.getFormControlValue(formControl).length,
          name: inputValue,
        }
      }
      this.getFormControlValue(formControl).push(object)
      this.inputArrayItem.value = ''
    }
  }

  getFormControlValue(formControl:string) {return this.formulario.controls[formControl].value}

  setFormControlValue(formControl:string, value:any) {this.formulario.controls[formControl].setValue(value)}

  getTasks(formControl:string, completed:boolean){
    return this.getFormControlValue(formControl).filter((v:any) => v.completed == completed)
  }

  resetIdValues(formControl:string){
    this.getFormControlValue(formControl).forEach((element:any, index:number) => {
      element.id = index
    });
  }

  deleteFromFormControlArray(formControl: string, id: number) {
    delete this.getFormControlValue(formControl)[id]
    this.setFormControlValue(formControl, this.getFormControlValue(formControl).filter((v:any) => v != null))
    this.resetIdValues(formControl)
  }
  
  switchStateTask(id:number) {
    this.getFormControlValue('tasks')[id].completed = !this.getFormControlValue('tasks')[id].completed
  }


}
