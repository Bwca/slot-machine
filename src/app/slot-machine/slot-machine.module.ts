import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SlotMachineComponent } from './components/slot-machine/slot-machine.component';
import { SlotMachineCanvasComponent } from './components/slot-machine-canvas/slot-machine-canvas.component';
import { BalanceComponent } from './components/balance/balance.component';
import { DebugMenuComponent } from './components/debug-menu/debug-menu.component';
import { PayTableComponent } from './components/pay-table/pay-table.component';
import { IsWinningConditionPipe } from './shared/pipes/is-winning-condition/is-winning-condition.pipe';

@NgModule({
  declarations: [
    SlotMachineComponent,
    SlotMachineCanvasComponent,
    BalanceComponent,
    DebugMenuComponent,
    PayTableComponent,
    IsWinningConditionPipe
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SlotMachineComponent]
})
export class SlotMachineModule {}
