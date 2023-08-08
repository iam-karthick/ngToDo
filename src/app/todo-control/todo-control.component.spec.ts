import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoControlComponent } from './todo-control.component';

describe('TodoControlComponent', () => {
  let component: TodoControlComponent;
  let fixture: ComponentFixture<TodoControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
