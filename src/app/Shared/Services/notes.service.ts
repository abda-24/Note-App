import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  getUserNotes() {
    throw new Error('Method not implemented.');
  }

 private readonly _HttpClient =inject(HttpClient);

addUserNotes(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/notes`,
    data,
    {
      headers:{token:'3b8ny__'+ localStorage.getItem('token')}
    }
  )
}

getNotes():Observable<any>
{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/notes`,
    {
      headers:{token:'3b8ny__'+ localStorage.getItem('token')}
    }
  )
}

update(id: string, data: object): Observable<any> {
 return this._HttpClient.put(`${environment.baseUrl}/api/v1/notes/${id}`,
  data,
  {
    headers:{token:'3b8ny__'+ localStorage.getItem('token')}
  }
 )
}


delateNote(id:string):Observable<any>
{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/notes/${id}`,

    {
      headers:{token:'3b8ny__'+ localStorage.getItem('token')}
    }
  )
}



}
