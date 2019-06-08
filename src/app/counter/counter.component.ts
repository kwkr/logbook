import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { WindowOpenerService } from '../core/window-opener.service';
import { LogDataService } from '../core/log-data.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  timeLeft = 1;
  counter$: Observable<number>;
  isCounting = false;

  constructor(
    private windowOpener: WindowOpenerService,
    private logService: LogDataService,
    private cr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.timeLeft = this.logService.getCurrentDuration();
    this.windowOpener.notifyOnFilled().subscribe(() => {
      this.startCounting();
    });
  }

  public startCounting(): void {
    this.timeLeft = this.logService.getCurrentDuration();
    this.isCounting = true;
    const intervalId = setInterval(() => {
      --this.timeLeft;
      if (this.timeLeft === 0) {
        this.windowOpener.openNewWindowWithReminder();
        clearInterval(intervalId);
      }
      this.cr.detectChanges();
    }, 1000);
  }
}
