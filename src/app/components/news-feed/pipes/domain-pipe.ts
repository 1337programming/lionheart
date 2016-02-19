import {Pipe, PipeTransform} from 'angular2/core';

/**
 * @example
 *   var domain = 'http://www.locomotivecms.com/articles/we-tried-to-solve-the-open-source-revenue-equation'
 *   DomainPipe.transform(domain)); // locomotivecms.com
 * @return {string}
 */
@Pipe({name: 'domainPipe'})
export class DomainPipe implements PipeTransform {
  transform(str:string) {
    if (!str) {
      return '';
    }
    var domain:string = str.split('/')[2];
    return domain ? domain.replace('www.', '') : domain;
  }

}