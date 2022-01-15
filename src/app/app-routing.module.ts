import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesModule } from './notes/notes.module';

import { AppComponent } from './app.component';

const routes: Routes = [
    { path: 'notes',
      loadChildren: () => NotesModule
    },
    //{ path: 'home', component: AppComponent},
    { path: '**', redirectTo: '/notes', pathMatch: 'full' },
    //{ path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
