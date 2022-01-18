import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-color',
  templateUrl: './view-color.component.html'
})
export class ViewColorComponent implements OnInit {

  inscricao?: Subscription;
  filterArray = [true, ""]

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.inscricao = this.route.params.subscribe(
      (params: any) => {this.filterArray = [true, params['color']];}
    );
    
  }

  ngOnDestroy(){
    this.inscricao?.unsubscribe();
  }

}
