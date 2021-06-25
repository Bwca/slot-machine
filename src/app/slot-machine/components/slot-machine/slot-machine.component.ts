import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-slot-machine',
  template: `
    <app-slot-machine-canvas></app-slot-machine-canvas>
    <app-pay-table></app-pay-table>
    <app-balance></app-balance>
    <app-debug-menu></app-debug-menu>
  `,
  styleUrls: ['./slot-machine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlotMachineComponent {}
