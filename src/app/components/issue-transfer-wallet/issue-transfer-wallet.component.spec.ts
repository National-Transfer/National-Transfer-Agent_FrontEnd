import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTransferWalletComponent } from './issue-transfer-wallet.component';

describe('IssueTransferWalletComponent', () => {
  let component: IssueTransferWalletComponent;
  let fixture: ComponentFixture<IssueTransferWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueTransferWalletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IssueTransferWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
