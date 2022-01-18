import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { InputTasksComponent } from './input-tasks/input-tasks.component';

@NgModule({
  declarations: [
    InputTasksComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [
    InputTasksComponent
  ],
})
export class SharedModule { }
