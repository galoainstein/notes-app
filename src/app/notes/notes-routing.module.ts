import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditNoteComponent } from './edit-note/edit-note.component';
import { NotesComponent } from './notes.component';
import { TrashComponent } from './trash/trash.component';

const notesRoutes: Routes = [
    //{ path: '', component: CursosComponent },
    { path: '', component: NotesComponent },
    { path: 'trash', component: TrashComponent },
    { path: 'edit/:id', component: EditNoteComponent },
    //{ path: ':id', component: CursoDetalheComponent }
];

@NgModule({
    imports: [RouterModule.forChild(notesRoutes)],
    exports: [RouterModule]
})
export class NotesRoutingModule {}