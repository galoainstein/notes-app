import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { NotesRoutingModule } from './notes-routing.module';

import { NotesComponent } from './notes.component';
import { NewNoteComponent } from './new-note/new-note.component';
import { SingleNoteComponent } from './single-note/single-note.component';

registerLocaleData(localeBr, 'pt')

@NgModule({
  declarations: [
    NotesComponent,
    NewNoteComponent,
    SingleNoteComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NotesRoutingModule
  ],
  exports:[
    NotesComponent,
    NewNoteComponent
  ],
  providers:[
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})

export class NotesModule {}
