import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesModule } from './notes/notes.module';

import { AppComponent } from './app.component';

const routes: Routes = [
    { path: 'notes', loadChildren: () => NotesModule },
    { path: '**', redirectTo: '/notes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
