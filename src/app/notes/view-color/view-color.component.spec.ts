import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewColorComponent } from './view-color.component';

describe('ViewColorComponent', () => {
  let component: ViewColorComponent;
  let fixture: ComponentFixture<ViewColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
