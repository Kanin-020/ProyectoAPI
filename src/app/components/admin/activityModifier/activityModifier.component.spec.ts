import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityModifierComponent } from './activityModifier.component';

describe('ActivityModifierComponent', () => {
  let component: ActivityModifierComponent;
  let fixture: ComponentFixture<ActivityModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityModifierComponent]
    });
    fixture = TestBed.createComponent(ActivityModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
