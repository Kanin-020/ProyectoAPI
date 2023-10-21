import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCreatorComponent } from './activityCreator.component';

describe('ActivityCreatorComponent', () => {
  let component: ActivityCreatorComponent;
  let fixture: ComponentFixture<ActivityCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityCreatorComponent]
    });
    fixture = TestBed.createComponent(ActivityCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
