import { Component } from '@angular/core';
import { NavBlankComponent } from "../../Components/nav-blank/nav-blank.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blanklayout',
  standalone: true,
  imports: [NavBlankComponent,RouterOutlet],
  templateUrl: './blanklayout.component.html',
  styleUrl: './blanklayout.component.scss'
})
export class BlanklayoutComponent {

}
