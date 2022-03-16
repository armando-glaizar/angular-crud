import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users: Array<any>, searchValue: string): Array<any> {
    if(!users || !searchValue) {
      return users;
    }

    return users.filter(
      user => user.payload.doc.get('usuario').toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }
}
