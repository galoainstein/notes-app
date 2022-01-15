import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTasksComponent } from './input-tasks.component';

describe('InputTasksComponent', () => {
  let component: InputTasksComponent;
  let fixture: ComponentFixture<InputTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
