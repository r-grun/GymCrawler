import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityCurrentComponent } from './capacity-current.component';

describe('CapacityCurrentComponent', () => {
  let component: CapacityCurrentComponent;
  let fixture: ComponentFixture<CapacityCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacityCurrentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacityCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
