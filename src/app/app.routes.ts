import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { authGuard } from './Shared/guards/auth.guard';
import { AuthlayoutComponent } from './layout/authlayout/authlayout.component';
import { BlanklayoutComponent } from './layout/blanklayout/blanklayout.component';

export const routes: Routes = [
 {path:'',component:AuthlayoutComponent,children:[
  {path:'', redirectTo:'register', pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path:'register',component:RegisterComponent},
 ]},
 {path:'',component:BlanklayoutComponent,children:[
  {path:'home',component:HomeComponent, canActivate:[authGuard]},
 ]},
 {path:'**', component:NotFoundComponent}
];
