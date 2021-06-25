import { Pipe, PipeTransform } from '@angular/core';

import { WinTypes } from '../../constants';
import { WinResult } from '../../models';

@Pipe({
  name: 'isWinningCondition'
})
export class IsWinningConditionPipe implements PipeTransform {
  transform(value: WinResult, winType: WinTypes, index: number | null = null): boolean {
    if (!value) {
      return false;
    }

    if (index === null) {
      return value.some(({ type }) => type === winType);
    } else if (Number.isInteger(index)) {
      return value.some(({ row, type }) => row === index && type === winType);
    }
    return false;
  }
}
