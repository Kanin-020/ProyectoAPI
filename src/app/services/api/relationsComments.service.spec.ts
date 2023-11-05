/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RelationsCommentsService } from './relationsComments.service';

describe('Service: RelationsComments', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelationsCommentsService]
    });
  });

  it('should ...', inject([RelationsCommentsService], (service: RelationsCommentsService) => {
    expect(service).toBeTruthy();
  }));
});
