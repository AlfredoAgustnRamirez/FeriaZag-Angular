import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoconsComponent } from './productocons.component';

describe('ProductoconsComponent', () => {
  let component: ProductoconsComponent;
  let fixture: ComponentFixture<ProductoconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoconsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductoconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
