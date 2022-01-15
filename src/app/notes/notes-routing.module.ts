import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewNoteComponent } from './new-note/new-note.component';
import { NotesComponent } from './notes.component';

const notesRoutes: Routes = [
    //{ path: '', component: CursosComponent },
    { path: '', component: NotesComponent },
    { path: 'new', component: NewNoteComponent },
    //{ path: ':id', component: CursoDetalheComponent }
];

@NgModule({
    imports: [RouterModule.forChild(notesRoutes)],
    exports: [RouterModule]
})
export class NotesRoutingModule {}