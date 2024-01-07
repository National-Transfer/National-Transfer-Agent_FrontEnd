import { TestBed } from '@angular/core/testing';

import { EmissionTransferService } from './emission-transfer.service';

describe('EmissionTransferService', () => {
  let service: EmissionTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmissionTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
