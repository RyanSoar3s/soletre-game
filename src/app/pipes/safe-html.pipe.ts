import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  private sanitizer = inject(DomSanitizer);

  transform(args: [ string, Array<String> ]): SafeHtml {
    const [ value, className ] = args;
    let html: string = "";

    for (const index in className) {
      html += `<span class=${className[index]}>${value[index]}</span>`;

    }

    return this.sanitizer.bypassSecurityTrustHtml(html);

  }
}
