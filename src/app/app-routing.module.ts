import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/pages/login/login.component';
import { UsersComponent } from './users/pages/users/users.component';
import { UserComponent } from './users/pages/user/user.component';
import { ErrorComponent } from './shared/pages/error/error.component';

import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'usuarios', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'usuarios/usuario', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
