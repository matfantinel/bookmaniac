import { TestBed, inject } from '@angular/core/testing';

import { InitialLoadService } from './initial-load.service';

describe('InitialLoadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitialLoadService]
    });
  });

  it('should be created', inject([InitialLoadService], (service: InitialLoadService) => {
    expect(service).toBeTruthy();
  }));
});
