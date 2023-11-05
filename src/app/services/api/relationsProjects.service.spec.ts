/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RelationsProjectsService } from './relationsProjects.service';

describe('Service: RelationsProjects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelationsProjectsService]
    });
  });

  it('should ...', inject([RelationsProjectsService], (service: RelationsProjectsService) => {
    expect(service).toBeTruthy();
  }));
});
