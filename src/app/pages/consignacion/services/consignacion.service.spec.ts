import { TestBed } from '@angular/core/testing';

import { ConsignacionService } from './consignacion.service';

describe('ConsignacionService', () => {
  let service: ConsignacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsignacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
