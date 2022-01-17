import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

import { LocalStorageService } from 'src/app/services/local-storage.service';

import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputTasksComponent),
  multi: true
};

@Component({
  selector: 'app-input-tasks',
  templateUrl: './input-tasks.component.html',
  styleUrls: ['./input-tasks.component.scss'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class InputTasksComponent implements ControlValueAccessor {

  @Input() tasksArray: any[] = []

  inputID = "input-task";
  inputArrayItem?: any;

  constructor() {}

  // document.getElementById(this.inputID).onkeypress = function(e) {
  //   if(e.keyCode == 13) {
  //       alert('You pressed enter!');
  //   }
  //   return 'a'
  // }

  isBlank(value:any){
    return value == null || value == "" || value == []
  }

  addToArray(){
    this.inputArrayItem = document.getElementById(this.inputID)!
    const inputValue:string = this.inputArrayItem.value
    if (!this.isBlank(inputValue)){
      var object = {
        id: this.tasksArray.length,
        name: inputValue,
        completed: false
      }
      
      this.tasksArray.push(object)
      this.inputArrayItem.value = ''
    }
  }

  deleteFromArray(id: number) {
    this.tasksArray.splice(id,1)
    this.resetIDValues()
  }

  getTasks(completed = true){
    return this.tasksArray.filter((task:any) => task.completed == completed)
  }

  resetIDValues(){
    this.tasksArray.forEach((task:any, index:number) => {
      task.id = index
    });
  }
  
  switchStateTask(id:number) {
    this.tasksArray[id].completed = !this.tasksArray[id].completed
  }

  private innerValue: any;

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

}
