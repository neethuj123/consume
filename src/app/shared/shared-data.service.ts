import { ApiService } from './../core/api.service';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private data = {
    usageList: null,
    scorecardDefinedFields: null,
    channelFieldsDataDefined: null,
    productFieldsDataDefined:null,
    usageStatusDataDefined:null,
    processedchannelFieldsDataDefined: null,
    processedproductFieldsDataDefined:null,
    processedusageStatusDataDefined:null

  };

  private usageListData = new BehaviorSubject([]);
  private channelFieldsData = new BehaviorSubject([]);
  private productFieldsData = new BehaviorSubject([]);
  private usageStatusFieldsData = new BehaviorSubject([]);
  private processedchannelFieldsData = new BehaviorSubject([]);
  private processedproductFieldsData = new BehaviorSubject([]);
  private processedusageStatusFieldsData = new BehaviorSubject([]);
  private scorecardFieldsData = new BehaviorSubject([]);

  constructor(private apiService: ApiService) { 
  }


  get scorecardFields() {
    return this.scorecardFieldsData.asObservable();
  }
  get channelFields() {
    return this.channelFieldsData.asObservable();
  }
  get usageStatusFields() {
    return this.usageStatusFieldsData.asObservable();
  }
  get productFields() {
    return this.productFieldsData.asObservable();
  }
  get processedchannelFields() {
    return this.processedchannelFieldsData.asObservable();
  }
  get processedusageStatusFields() {
    return this.processedusageStatusFieldsData.asObservable();
  }
  get processedproductFields() {
    return this.processedproductFieldsData.asObservable();
  }


  initScorecardFields() {
    this.apiService.get('/usageInfo').subscribe((response) => {
      this.data.scorecardDefinedFields = response;

      let rawResource = response[0].fields;
      for(let i =0;i<rawResource.length;i++){
        if(rawResource[i].fieldName=='channel'){
            this.data.channelFieldsDataDefined = rawResource[i].fieldValue;
        }
        if(rawResource[i].fieldName=='ProductName'){
            this.data.productFieldsDataDefined = rawResource[i].fieldValue;
        }
        if(rawResource[i].fieldName=='Status'){
            this.data.usageStatusDataDefined = rawResource[i].fieldValue;
        }
      }

      let processResource = response[1].fields;
      for(let i =0;i<processResource.length;i++){
        if(processResource[i].fieldName=='channel'){
            this.data.processedchannelFieldsDataDefined = processResource[i].fieldValue;
        }
        if(processResource[i].fieldName=='ProductName'){
            this.data.processedproductFieldsDataDefined = processResource[i].fieldValue;
        }
        if(processResource[i].fieldName=='Status'){
            this.data.processedusageStatusDataDefined = processResource[i].fieldValue;
        }
      }

      this.processedusageStatusFieldsData.next(this.data.processedusageStatusDataDefined);
      this.processedproductFieldsData.next(this.data.processedproductFieldsDataDefined);
      this.processedchannelFieldsData.next(this.data.processedchannelFieldsDataDefined);

      this.usageStatusFieldsData.next(this.data.usageStatusDataDefined);
      this.productFieldsData.next(this.data.productFieldsDataDefined);
      this.channelFieldsData.next(this.data.channelFieldsDataDefined);
      this.scorecardFieldsData.next(this.data.scorecardDefinedFields);
    });
  }

  
}
