import { MatIconModule } from '@angular/material/icon';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { NotesRoutingModule } from './notes-routing.module';

import { NotesComponent } from './notes.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { SingleNoteComponent } from './single-note/single-note.component';
import { TrashComponent } from './trash/trash.component';
import { ViewColorComponent } from './view-color/view-color.component';

registerLocaleData(localeBr, 'pt')

@NgModule({
  declarations: [
    NotesComponent,
    EditNoteComponent,
    SingleNoteComponent,
    TrashComponent,
    ViewColorComponent,
  ],
  imports: [
    CommonModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NotesRoutingModule,
    MatIconModule
  ],
  providers:[
    { provide: LOCALE_ID, useValue: 'pt' },
  ]
})

export class NotesModule {}
