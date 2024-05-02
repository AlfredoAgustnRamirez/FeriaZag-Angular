import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignacionComponent } from './consignacion.component';

describe('ConsignacionComponent', () => {
  let component: ConsignacionComponent;
  let fixture: ComponentFixture<ConsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsignacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
