/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaskArchiveComponent } from './taskArchive.component';

describe('TaskManagerComponent', () => {
  let component: TaskArchiveComponent;
  let fixture: ComponentFixture<TaskArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
