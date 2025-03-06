import { Component, inject } from '@angular/core';
import { AuthSService } from '../../Shared/Services/auth-s.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {

  private readonly _AuthSService =inject(AuthSService);
  private readonly _Router =inject(Router)

  logOut():void{
   localStorage.removeItem('token');
  this._AuthSService.userDataDecode.next(null);
     this._Router.navigate(['/login']);

  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


}
