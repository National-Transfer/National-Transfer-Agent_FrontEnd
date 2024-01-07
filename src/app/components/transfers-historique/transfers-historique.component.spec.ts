import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersHistoriqueComponent } from './transfers-historique.component';

describe('TransfersHistoriqueComponent', () => {
  let component: TransfersHistoriqueComponent;
  let fixture: ComponentFixture<TransfersHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransfersHistoriqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransfersHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
