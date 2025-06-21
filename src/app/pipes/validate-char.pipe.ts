import { Pipe, PipeTransform } from '@angular/core';
import { TrimPipe } from './trim.pipe';

@Pipe({
  name: 'validateChar'
})
export class ValidateCharPipe implements PipeTransform {
  transform(value: string, chars: string | Array<string>): [ string, Array<string> ] {
    const classNameArray: Array<string> = [];
    const charList = (typeof chars === "string") ? chars.split("") : chars;
    let className: string = "l-invalid";

    const trim = new TrimPipe();
    value = trim.transform(value);

    for (const v of value) {
      const normalizedChar = this.normalizeString(v);
      if (charList.includes(normalizedChar.toLowerCase())) {
        if (charList.indexOf(normalizedChar.toLowerCase()) === 3) className = "l-central";
        else className = "l-valid";

      }
      classNameArray.push(className);
      className = "l-invalid";

    }

    return [ value, classNameArray ];

  }

  normalizeString(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, '');

  }

}
