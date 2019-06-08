import { Component, OnInit } from '@angular/core';
import { LogDataService } from '../core/log-data.service';

export interface DayLogs {
  title: string;
  logs: string[];
}

@Component({
  selector: 'app-log-history',
  templateUrl: './log-history.component.html',
  styleUrls: ['./log-history.component.scss']
})
export class LogHistoryComponent implements OnInit {
  logsToDisplay: DayLogs[] = [];

  constructor(private logService: LogDataService) {}

  ngOnInit() {
    Object.entries(this.logService.getTodaysLogs()).forEach(entry => {
      const logs: any = entry[1];
      const newLog: DayLogs = { title: entry[0], logs: logs };
      this.logsToDisplay.push(newLog);
    });
  }
}
