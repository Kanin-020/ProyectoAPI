import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModifierComponent } from './taskModifier.component';

describe('TaskModifierComponent', () => {
  let component: TaskModifierComponent;
  let fixture: ComponentFixture<TaskModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskModifierComponent]
    });
    fixture = TestBed.createComponent(TaskModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
