import { TestBed } from '@angular/core/testing';

import { TransfersHistoriqueService } from './transfers-historique.service';

describe('TransfersHistoriqueService', () => {
  let service: TransfersHistoriqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransfersHistoriqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
