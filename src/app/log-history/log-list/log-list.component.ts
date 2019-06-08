import { Component, OnInit, Input } from '@angular/core';
import { DayLogs } from '../log-history.component';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit {
  @Input() log: DayLogs;

  constructor() {}

  ngOnInit() {}
}
