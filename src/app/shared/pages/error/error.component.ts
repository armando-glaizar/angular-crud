import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  errorType: string = '';

  constructor(private activatedRoute: ActivatedRoute, private msalService: MsalService, private router: Router) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.errorType = params['errorType'];
    });
  }

  ngOnInit(): void { }

  navigateHomePage(): void {
    if(this.errorType == 'Microsoft') {
      this.msalService.logout();
    }
    else {
      this.router.navigate(['']);
    }
  }
}
