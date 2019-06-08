import { TestBed } from '@angular/core/testing';

import { WindowOpenerService } from './window-opener.service';

describe('WindowOpenerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WindowOpenerService = TestBed.get(WindowOpenerService);
    expect(service).toBeTruthy();
  });
});
