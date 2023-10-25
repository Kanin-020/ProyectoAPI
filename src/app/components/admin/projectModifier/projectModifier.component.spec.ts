import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectModifierComponent } from './projectModifier.component';

describe('ProjectModifierComponent', () => {
  let component: ProjectModifierComponent;
  let fixture: ComponentFixture<ProjectModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectModifierComponent]
    });
    fixture = TestBed.createComponent(ProjectModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
