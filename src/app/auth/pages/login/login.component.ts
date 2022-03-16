import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AngularFirestore } from '@angular/fire/firestore';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private socialAuthService: SocialAuthService, private firestore: AngularFirestore, private msalService: MsalService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user') != null && localStorage.getItem('userType') != null) {
      this.router.navigate(['/usuarios']);
    }
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(onfulfilled => {
        this.firestore.collection('usuarios', ref => ref.where('usuario', '==', onfulfilled.email)).get()
          .subscribe(next => {
            if(!next.empty) {
              localStorage.setItem('userType', 'Google');
              localStorage.setItem('user', JSON.stringify(next.docs[0]));
              
              this.router.navigate(['/usuarios']);
            }
            else {
              this.socialAuthService.signOut(true);
              this.router.navigate(['/error'], { queryParams: { errorType: 'Google' } });
            }
          });
      })
      .catch(onrejected => {
        console.log(onrejected);
      });
  }

  signInWithMicrosoft(): void {
    this.msalService.loginPopup().toPromise()
      .then(onfulfilled => {
        console.log(onfulfilled);

        this.firestore.collection('usuarios', ref => ref.where('usuario', '==', onfulfilled.account?.username)).get()
          .subscribe(next => {
            if(!next.empty) {
              localStorage.setItem('userType', 'Microsoft');
              localStorage.setItem('user', JSON.stringify(next.docs[0]));

              this.router.navigate(['/usuarios']);
            }
            else {
              this.router.navigate(['/error'], { queryParams: { errorType: 'Microsoft' } });
            }
          });
      })
      .catch(onrejected => {
        console.log(onrejected);
      });
  }
}
