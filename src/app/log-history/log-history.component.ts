import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LogDataService, Log } from '../core/log-data.service';

export interface DayLogs {
  title: string;
  logs: Log[];
}

@Component({
  selector: 'app-log-history',
  templateUrl: './log-history.component.html',
  styleUrls: ['./log-history.component.scss']
})
export class LogHistoryComponent implements OnInit {
  logsToDisplay: DayLogs[] = [];

  constructor(
    private logService: LogDataService,
    private cr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.logService.getTodaysLogs().subscribe(logs => {
      const newLogs = [];
      Object.entries(logs).forEach(entry => {
        const logsFromSource: any = entry[1];
        const newLog: DayLogs = { title: entry[0], logs: logsFromSource };
        newLogs.push(newLog);
      });
      this.logsToDisplay = newLogs;
      this.cr.detectChanges();
    });
  }
}
