import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    UsersComponent,
    UserComponent
  ]
})
export class UsersModule { }
