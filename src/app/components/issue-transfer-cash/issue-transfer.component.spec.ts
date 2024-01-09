import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTransferComponent } from './issue-transfer.component';

describe('IssueTransferComponent', () => {
  let component: IssueTransferComponent;
  let fixture: ComponentFixture<IssueTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IssueTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
