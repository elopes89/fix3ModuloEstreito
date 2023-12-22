import { TestBed } from '@angular/core/testing';

import { NgxToggleService } from './ngx-toggle.service';

describe('NgxToggleService', () => {
  let service: NgxToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
