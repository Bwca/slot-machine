import { Component, OnInit } from '@angular/core';
import { PrizeService } from '../prize/prize.service';

@Component({
  selector: 'app-pay-table',
  templateUrl: './pay-table.component.html',
  styleUrls: ['./pay-table.component.scss']
})
export class PayTableComponent implements OnInit {
  constructor(private prize: PrizeService) {}

  ngOnInit(): void {
    this.prize.prize$.subscribe(console.log);
  }
}
