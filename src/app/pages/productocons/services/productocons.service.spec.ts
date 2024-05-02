import { TestBed } from '@angular/core/testing';

import { ProductoconsService } from './productocons.service';

describe('ProductoconsService', () => {
  let service: ProductoconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
