import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUD';

  constructor(private authService: SocialAuthService, private router: Router, private msalService: MsalService) { 
    if(localStorage.getItem('user') != null && localStorage.getItem('userType') != null) {
      if(localStorage.getItem('userType') == 'Google') {
        this.authService.initState.subscribe(next => {
          this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID)
            .then(onfulfilled => {
              console.log(onfulfilled);
            })
            .catch(onrejected => {
              console.log(onrejected);
              
              localStorage.removeItem('userType');
              localStorage.removeItem('user');
              
              this.router.navigate(['']);
            });
        });
      }
    }
  }

  signOut(): void {
    if(localStorage.getItem('userType') == 'Google') {
      this.authService.signOut(true)
        .then(onfulfilled => {
          localStorage.removeItem('userType');
          localStorage.removeItem('user');

          this.router.navigate(['']);
        })
        .catch(onrejected => {
          console.log(onrejected);
        });
    }
    else {
      localStorage.removeItem('userType');
      localStorage.removeItem('user');

      this.msalService.logout().toPromise()
        .then(onfulfilled => {
          console.log(onfulfilled);
        })
        .catch(onrejected => {
          console.log(onrejected);
        });
    }
  }

  isSignIn(): boolean {
    return localStorage.getItem('user') != null && localStorage.getItem('userType') != null ? true : false;
  }
}
