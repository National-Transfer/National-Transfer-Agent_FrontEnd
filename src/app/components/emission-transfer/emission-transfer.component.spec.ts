import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionTransferComponent } from './emission-transfer.component';

describe('EmissionTransferComponent', () => {
  let component: EmissionTransferComponent;
  let fixture: ComponentFixture<EmissionTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmissionTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmissionTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
