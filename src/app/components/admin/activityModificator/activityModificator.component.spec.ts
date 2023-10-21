import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityModificatorComponent } from './activityModificator.component';

describe('ActivityModificatorComponent', () => {
  let component: ActivityModificatorComponent;
  let fixture: ComponentFixture<ActivityModificatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityModificatorComponent]
    });
    fixture = TestBed.createComponent(ActivityModificatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
