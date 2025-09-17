/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BodegasService } from './bodegas.service';

describe('Service: Bodegas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BodegasService]
    });
  });

  it('should ...', inject([BodegasService], (service: BodegasService) => {
    expect(service).toBeTruthy();
  }));
});
