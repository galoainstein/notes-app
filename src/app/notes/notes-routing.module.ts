import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditNoteComponent } from './edit-note/edit-note.component';
import { NotesComponent } from './notes.component';

const notesRoutes: Routes = [
    //{ path: '', component: CursosComponent },
    { path: '', component: NotesComponent },
    { path: 'edit/:id', component: EditNoteComponent },
    //{ path: ':id', component: CursoDetalheComponent }
];

@NgModule({
    imports: [RouterModule.forChild(notesRoutes)],
    exports: [RouterModule]
})
export class NotesRoutingModule {}