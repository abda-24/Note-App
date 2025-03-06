import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment/enviroment';
import { json } from 'stream/consumers';
import { jwtDecode } from 'jwt-decode';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthSService {


  private readonly _HttpClient = inject(HttpClient);
  userDataDecode:BehaviorSubject<any> = new BehaviorSubject(null);

  SetRegisterFrom(data:object):Observable<any> {
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/users/signUp`,
   data
  )
}


setLoginFrom(data:object):Observable<any> {

return this._HttpClient.post(`${environment.baseUrl}/api/v1/users/signIn`,
data)

}

sharedUserData()
{
  const token = JSON.stringify(localStorage.getItem('token'));
  const decode = jwtDecode(token);
 this.userDataDecode.next(jwtDecode(token));
  console.log(this.userDataDecode.getValue());

}


}
