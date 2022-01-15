import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss']
})
export class SingleNoteComponent implements OnInit {

  @Input() titulo?: string;
  @Input() description?: string;
  @Input() tasks: string[] = [];
  @Input() tags: string[] = [];
  @Input() color?: string;
  @Input() pinned?: boolean;

  //implement media src
  //implement data de cadastro, notificações e deadline

  constructor() { }

  ngOnInit(): void {
  }

}
