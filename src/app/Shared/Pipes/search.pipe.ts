import { Pipe, PipeTransform } from '@angular/core';
import { INote } from '../interface/inote';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(Notes: INote[], term:string): INote[] {
   return Notes.filter((note)=>
    note.title.toLowerCase().includes(term.toLowerCase()));
  }

}
