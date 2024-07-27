import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKeys',
  standalone: true,
})
export class ObjectKeysPipe implements PipeTransform {
  transform(value: { [key: string]: any[] }): string[] {
    return Object.keys(value);
  }
}
