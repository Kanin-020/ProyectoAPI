import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreatorComponent } from './taskCreator.component';

describe('TaskCreatorComponent', () => {
  let component: TaskCreatorComponent;
  let fixture: ComponentFixture<TaskCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskCreatorComponent]
    });
    fixture = TestBed.createComponent(TaskCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
