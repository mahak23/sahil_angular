import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserListComponent } from './user-list/user-list.component';



const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'signUp', component: SignUpComponent
  },
  {
    path: 'forgotPassword', component: ForgotPasswordComponent
  },
  {
    path: 'userList', component: UserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
