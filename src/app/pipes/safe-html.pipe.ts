import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  sanitizer = inject(DomSanitizer);

  transform(value: string, className: string[]): SafeHtml {
    let html: string = "";

    for (const index in className) {
      html += `<span class=${className[index]}>${value[index]}</span>\n`

    }

    return this.sanitizer.bypassSecurityTrustHtml(html);

  }
}
