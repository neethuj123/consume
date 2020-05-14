import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModule,NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppHomeRoutingModule } from './app-home-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeNavComponent } from './home/home-nav/home-nav.component';
import {NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../shared/shared.module';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleModalModule } from 'ngx-simple-modal';
import { DatePipe } from '@angular/common'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderService } from './../services/loader.service';
import { LoaderInterceptor } from './../interceptors/loader-interceptor.service';
import { MyLoaderComponent } from './../components/my-loader/my-loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [HomeComponent, HomeNavComponent,MyLoaderComponent],
  
  imports: [
  	SharedModule,
    HttpClientModule,
    NgxSpinnerModule,
  	NgbModule,
  	NgSelectModule,
  	NgbPaginationModule,
    AppHomeRoutingModule,
    FormsModule,
    TagInputModule,
    AngularMyDatePickerModule,
    BrowserAnimationsModule,
    SimpleModalModule.forRoot({container: "modal-container"})

  ],
  providers: [DatePipe,LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }]
})
export class AppHomeModule { }
