/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovimientosService } from './movimientos.service';

describe('Service: Movimientos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovimientosService]
    });
  });

  it('should ...', inject([MovimientosService], (service: MovimientosService) => {
    expect(service).toBeTruthy();
  }));
});
