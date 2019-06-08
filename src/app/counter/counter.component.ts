import { Component, Input } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { WindowOpenerService } from '../core/window-opener.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  @Input() timeLeft = 1;
  counter$: Observable<number>;

  constructor(private windowOpener: WindowOpenerService) {}

  public startCounting(): void {
    this.counter$ = timer(0, 1000).pipe(
      take(this.timeLeft),
      map(() => --this.timeLeft)
    );
    this.counter$.subscribe(
      () => {},
      () => {
        console.log('error while counting');
      },
      () => {
        console.log('completed');
        this.windowOpener.openNewWindowWithReminder();
      }
    );
  }

  public getMinutes(): string {
    const stringToReturn: string = String(Math.floor(this.timeLeft / 60));
    return stringToReturn.length === 1 ? '0' + stringToReturn : stringToReturn;
  }

  public getSeconds(): string {
    const stringToReturn: string = String(this.timeLeft % 60);
    return stringToReturn.length === 1 ? '0' + stringToReturn : stringToReturn;
  }
}
