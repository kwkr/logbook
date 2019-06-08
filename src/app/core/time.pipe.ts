import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(timeInMinutes: number, args?: any): any {
    return (
      this.getMinutes(timeInMinutes) + ':' + this.getSeconds(timeInMinutes)
    );
  }

  private getMinutes(timeInMinutes: number): string {
    const stringToReturn: string = String(Math.floor(timeInMinutes / 60));
    return stringToReturn.length === 1 ? '0' + stringToReturn : stringToReturn;
  }

  private getSeconds(timeInMinutes: number): string {
    const stringToReturn: string = String(timeInMinutes % 60);
    return stringToReturn.length === 1 ? '0' + stringToReturn : stringToReturn;
  }
}
