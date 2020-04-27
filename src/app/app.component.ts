import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { SharedDataService } from './shared/shared-data.service';
import { AuthenticationService } from './core/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user;
  constructor(private translate: TranslateService,
      		  private sharedDataService: SharedDataService,
      		  private authenticationService: AuthenticationService) 
    {
        translate.setDefaultLang(environment.defaultLang);
    }
    ngOnInit() {
    this.authenticationService.currentUser.subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.sharedDataService.initScorecardFields();
        
      }
    });
  }
}
