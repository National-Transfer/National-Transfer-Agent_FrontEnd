import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeTransferWalletComponent } from './serve-transfer-wallet.component';

describe('ServeTransferWalletComponent', () => {
  let component: ServeTransferWalletComponent;
  let fixture: ComponentFixture<ServeTransferWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServeTransferWalletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServeTransferWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
