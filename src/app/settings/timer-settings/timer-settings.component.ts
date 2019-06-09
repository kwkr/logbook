import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { SettingsService } from 'src/app/core/settings.service';
const successMsgValue = 'Successfully changed timer value!';

@Component({
  selector: 'app-timer-settings',
  templateUrl: './timer-settings.component.html',
  styleUrls: ['./timer-settings.component.scss']
})
export class TimerSettingsComponent implements OnInit {
  timerValueFormControl: FormControl;
  isSuccessfulyChanged = false;
  successMsg = successMsgValue;

  constructor(private settings: SettingsService) {
    const currentTimerSetting = Math.floor(settings.getCurrentDuration() / 60);
    this.timerValueFormControl = new FormControl(
      currentTimerSetting,
      (input: AbstractControl) => {
        const isNotNumeric =
          isNaN(parseFloat(input.value)) && isFinite(input.value);
        if (isNotNumeric) {
          return { required: '' };
        }
        return null;
      }
    );
  }

  ngOnInit() {}

  saveNewTimer() {
    this.timerValueFormControl.markAsTouched();
    if (!this.timerValueFormControl.valid) {
      console.log('not valid');

      this.timerValueFormControl.setValue(
        Math.floor(this.settings.getCurrentDuration() / 60)
      );
      return;
    }
    this.isSuccessfulyChanged = true;
    setTimeout(() => {
      this.isSuccessfulyChanged = false;
    }, 1000);
    this.settings.saveNewDuration(this.timerValueFormControl.value * 60);
  }
}
