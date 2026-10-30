import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseTitle'
})
export class UppercaseTitlePipe implements PipeTransform {

  transform(value: string): string {
    return value.toUpperCase();
  }

}