import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotMachineCanvasComponent } from './slot-machine-canvas.component';

describe('SlotMachineCanvasComponent', () => {
  let component: SlotMachineCanvasComponent;
  let fixture: ComponentFixture<SlotMachineCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlotMachineCanvasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotMachineCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
