// my-loader.component.ts
import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import {
    SpinnerComponent
} from './../../modal/alert/spinner.component';
import {
    SimpleModalService
} from 'ngx-simple-modal';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-my-loader',
  templateUrl: './my-loader.component.html',
  styleUrls: ['./my-loader.component.scss']
})
export class MyLoaderComponent implements OnInit {

  loading: boolean;

  constructor(private loaderService: LoaderService,private SimpleModalService:SimpleModalService,private spinner: NgxSpinnerService ) {

    this.loaderService.isLoading.subscribe((v) => {
      console.log(v);
      this.loading = v;
      if(this.loading){
            this.spinner.show();

        }
        else{
                this.spinner.hide();

        }

    });

  }
  ngOnInit() {
  }

}