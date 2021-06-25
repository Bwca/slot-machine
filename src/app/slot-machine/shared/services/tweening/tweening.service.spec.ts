import { TestBed } from '@angular/core/testing';

import { TweeningService } from './tweening.service';

describe('TweeningService', () => {
  let service: TweeningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweeningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
