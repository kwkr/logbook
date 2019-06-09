import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WindowOpenerService } from '../core/window-opener.service';
import { LogDataService } from '../core/log-data.service';
import { SettingsService } from '../core/settings.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  timeLeft = 1;
  isCounting = false;
  isPaused = false;
  pauseOptions = [
    'Don\'t stop!',
    'Focus!',
    'Don\'t forget to get back to work!',
    'There is still plenty to do!'
  ];
  currentPauseText;
  currentIntervalId;

  constructor(
    private windowOpener: WindowOpenerService,
    private logService: LogDataService,
    private settingsService: SettingsService,
    private cr: ChangeDetectorRef
  ) {
    this.generateRandomPauseText();
  }

  private generateRandomPauseText() {
    this.currentPauseText = this.pauseOptions[
      Math.floor(Math.random() * this.pauseOptions.length)
    ];
  }

  ngOnInit(): void {
    this.timeLeft = this.settingsService.getCurrentDuration();
    this.windowOpener.notifyOnFilled().subscribe(() => {
      this.startCounting();
    });
  }

  public startCounting(): void {
    this.timeLeft = this.settingsService.getCurrentDuration();
    this.isCounting = true;
    this.isPaused = false;
    this.currentIntervalId = setInterval(() => {
      --this.timeLeft;
      if (this.timeLeft === 0) {
        this.windowOpener.openNewWindowWithReminder();
        clearInterval(this.currentIntervalId);
      }
      this.cr.detectChanges();
    }, 1000);
  }

  public pauseCounting() {
    this.isPaused = true;
    this.isCounting = false;
    clearInterval(this.currentIntervalId);
  }

  public resumeCounting() {
    this.generateRandomPauseText();
    this.isCounting = true;
    this.isPaused = false;
    this.currentIntervalId = setInterval(() => {
      --this.timeLeft;
      if (this.timeLeft === 0) {
        this.windowOpener.openNewWindowWithReminder();
        clearInterval(this.currentIntervalId);
      }
      this.cr.detectChanges();
    }, 1000);
  }
}
