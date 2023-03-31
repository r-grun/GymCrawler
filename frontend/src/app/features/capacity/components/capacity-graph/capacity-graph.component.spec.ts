import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapacityGraphComponent } from './capacity-graph.component';

describe('CapacityCurrentComponent', () => {
  let component: CapacityGraphComponent;
  let fixture: ComponentFixture<CapacityGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacityGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacityGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
