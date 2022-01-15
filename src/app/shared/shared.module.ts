import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { InputFieldComponent } from './input-field/input-field.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputTasksComponent } from './input-tasks/input-tasks.component';
import { InputTagsComponent } from './input-tags/input-tags.component';


@NgModule({
  declarations: [
    InputFieldComponent,
    ErrorMsgComponent,
    InputTasksComponent,
    InputTagsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InputFieldComponent
  ],
})
export class SharedModule { }
