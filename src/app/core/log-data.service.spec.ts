import { TestBed } from '@angular/core/testing';

import { LogDataService } from './log-data.service';

describe('LogDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogDataService = TestBed.get(LogDataService);
    expect(service).toBeTruthy();
  });
});
