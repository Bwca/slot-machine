import { Pipe, PipeTransform } from '@angular/core';
import { WinTypes } from '../../constants';
import { WinResult } from '../../models';

@Pipe({
  name: 'isWinningCondition'
})
export class IsWinningConditionPipe implements PipeTransform {
  transform(value: WinResult, winType: WinTypes, index?: number): boolean {
    if (!value) {
      return false;
    }

    if (index === undefined) {
      return value.some(({ type }) => type === winType);
    } else if (Number.isInteger(index)) {
      return value[index].type === winType;
    }
    return false;
  }
}
