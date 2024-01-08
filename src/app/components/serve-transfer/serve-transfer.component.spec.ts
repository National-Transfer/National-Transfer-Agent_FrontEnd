import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeTransferComponent } from './serve-transfer.component';

describe('ServeTransferComponent', () => {
  let component: ServeTransferComponent;
  let fixture: ComponentFixture<ServeTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServeTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServeTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
