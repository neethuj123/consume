import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './app-user/user-login/user-login.component';
import { HomeComponent } from './app-home/home/home.component';
import { AppHistoryComponent } from './app-history/app-history.component';
import { AuthGuard } from './core/auth.guard';


const routes: Routes = [
{ path: 'login', component: UserLoginComponent },
{ path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
{ path: 'history', component: AppHistoryComponent, canActivate: [ AuthGuard ] },

{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
