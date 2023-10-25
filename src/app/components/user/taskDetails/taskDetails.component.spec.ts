import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsComponent } from './taskDetails.component';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskDetailsComponent]
    });
    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
