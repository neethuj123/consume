import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UserProfileComponent } from './header/user-profile/user-profile.component';
import { MatToolbarModule} from  '@angular/material/toolbar';
import { MatIconModule } from  '@angular/material/icon';
import { MatSidenavModule } from  '@angular/material/sidenav';
import { MatListModule } from  '@angular/material/list';
import { MatButtonModule } from  '@angular/material/button';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    UserProfileComponent
    ],
  imports: [
    RouterModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    UserProfileComponent
  ]
})
export class AppCommonModule { }
