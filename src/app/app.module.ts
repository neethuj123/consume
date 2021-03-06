import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHomeModule } from './app-home/app-home.module';
import { AppCommonModule } from './app-common/app-common.module';
import { MatToolbarModule} from  '@angular/material/toolbar';
import { MatIconModule } from  '@angular/material/icon';
import { MatSidenavModule } from  '@angular/material/sidenav';
import { MatListModule } from  '@angular/material/list';
import { MatButtonModule } from  '@angular/material/button';
import { AppRoutingModule } from './app-routing.module'
import { AppHttpInterceptor } from './core/app.http.interceptor';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './app-user/user-login/user-login.component';
import { AppHistoryComponent } from './app-history/app-history.component';
import { AlertComponent } from './modal/alert/alert.component';
import { SimpleModalModule } from 'ngx-simple-modal';
import { SpinnerComponent } from './modal/alert/spinner.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    AppHistoryComponent,
    AlertComponent,
    SpinnerComponent
  ],
   entryComponents: [AlertComponent,SpinnerComponent],
    imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    NgxSpinnerModule,
    MatIconModule,
     // ngx-translate and the loader module
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    AppHomeModule,
    AppCommonModule,
    AppRoutingModule,
    SimpleModalModule.forRoot({container: "modal-container"})
  ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [{ provide: HTTP_INTERCEPTORS , useClass: AppHttpInterceptor, multi: true },NgxSpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
