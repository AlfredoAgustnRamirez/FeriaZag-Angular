import { TestBed } from '@angular/core/testing';

import { VentasDetallesService } from './ventas-detalles.service';

describe('VentasDetallesService', () => {
  let service: VentasDetallesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentasDetallesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
