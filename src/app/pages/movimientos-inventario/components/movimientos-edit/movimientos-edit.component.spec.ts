import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosEditComponent } from './movimientos-edit.component';

describe('MovimientosEditComponent', () => {
  let component: MovimientosEditComponent;
  let fixture: ComponentFixture<MovimientosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientosEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
