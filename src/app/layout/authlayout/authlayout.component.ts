import { Component } from '@angular/core';
import { NavAuthComponent } from "../../Components/nav-auth/nav-auth.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authlayout',
  standalone: true,
  imports: [NavAuthComponent,RouterOutlet],
templateUrl: './authlayout.component.html',
  styleUrl: './authlayout.component.scss'
})
export class AuthlayoutComponent {

}
