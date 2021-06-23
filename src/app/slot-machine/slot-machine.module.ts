import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlotMachineComponent } from './slot-machine/slot-machine.component';
import { SlotMachineCanvasComponent } from './slot-machine-canvas/slot-machine-canvas.component';
import { BalanceComponent } from './balance/balance.component';
import { DebugMenuComponent } from './debug-menu/debug-menu.component';
import { PayTableComponent } from './pay-table/pay-table.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SlotMachineComponent,
    SlotMachineCanvasComponent,
    BalanceComponent,
    DebugMenuComponent,
    PayTableComponent
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SlotMachineComponent]
})
export class SlotMachineModule {}
