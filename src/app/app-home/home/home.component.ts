import { Component, OnInit,Injectable } from '@angular/core';
import { ApiService } from './../../core/api.service';
import {formatDate} from '@angular/common';
import { SharedDataService } from './../../shared/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {NgbModule,NgbPaginationModule,NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { AlertComponent } from './../../modal/alert/alert.component';
import { SimpleModalService } from 'ngx-simple-modal';
import {NgbDatepickerI18n, NgbTimeStruct,NgbDateStruct,NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthenticationService } from './../../core/authentication.service';
import { DatePipe } from '@angular/common'



const I18N_VALUES = {
  'fr': {
    weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
  },
  'en': {
    weekdays: ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jully', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  }
  // other languages you would support
};

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor() {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[environment.defaultLang].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[environment.defaultLang].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
   providers: [{provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}] 
})
export class HomeComponent implements OnInit {
fromTime: NgbTimeStruct;
toTime: NgbTimeStruct;

 
  user;
  data ={};
  date = {};
  usageList;
  channelData;
  productData;
  rawUsageIdentifiers = [];
  usageStatusData;
  channelField = '0';
  productField = '0';
  statusField = '0';
  selectedTemplate = '0';
  tableData = [];
  displayTable = false;
  page =1;
  pageSize = 4;
  collectionSize;
  showFilterBlock = false;
  searchNum;
  searchText;
  scorecardFields;
  scorecardSubFields;
  selectedFiels = '0';
  subscribeInput = false;
  statusInput = false;
  userInput = false;
  productInput = false;
  alphaInput = false;
  dateInput = false;
  channelInput = false;
  rawUsageIdentifier = false;
  Datevalue;
  primaryPlaceholder;
  secondaryPlaceholder;
  channelPrimaryPlaceholder;
  channelSecondaryPlaceholder;
  productPrimaryPlaceholder;
  productSecondaryPlaceholder;
  statusPrimaryPlaceholder;
  statusSecondaryPlaceholder;
  subscribePrimaryPlaceholder;
  subscribeSecondaryPlaceholder;
  userPrimaryPlaceholder;
  userSecondaryPlaceholder;
  numData = {};
  type;
    items = [];
  channelItems = [];
  productItems = [];
  statusItems = [];
  subscribeItems = [];
  userItems = [];
  dontSelect;
  fromDateRange;
  toDateRange;
  dateArray = [];
  alreadySelectedChannel = false;
  alreadySelectedProduct = false;
  alreadySelectedStatus = false;
  alreadySelectedIdenti = false;
  alreadySelectedNum = false;
  alreadySelectedText = false;
  alreadySelectedDate = false;
  itemsAsObjects = [];
  hoveredDate: NgbDate | null = null;
  rawUsage = true;
  processed = false;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  defaultLang ="fr";
  channelArray=[];
  productArray;
  statusArray;
  processchannelArray;
  processproductArray;
  processstatusArray;
  channelFinalArray;
  statusFinalArray;
  productFinalArray;
  mode = "and";
  dateFieldFrom: IMyDateModel = null;
  dateFieldTo: IMyDateModel = null;
  dateFieldInputOptions: IAngularMyDpOptions = {
    dateFormat: 'dd/mm/yyyy'
  };
  test;
  fromTimeInFormat;
  toTimeInFormat;
  private questionFormModelDefault = {
      fieldType: '',
      fieldName: '',
      dataType: '',
      fieldLabel: '',
      fieldValue: []
  };
  questionFormModel = { ...this.questionFormModelDefault };

  get tableDetail() {
       return this.tableData.slice((this.page-1)*this.pageSize,this.page*this.pageSize);
  }

  constructor(private sharedDataService:SharedDataService,
              private apiService:ApiService,
              private translateService:TranslateService,
              private _route: ActivatedRoute,
              private calendar: NgbCalendar, 
              public formatter: NgbDateParserFormatter,
              private config: NgbDatepickerConfig,
              private SimpleModalService:SimpleModalService,
              private authenticationService: AuthenticationService,
              public datepipe: DatePipe
              ){
                this.defaultLang = environment.defaultLang;
               }
  
  selectChangeHandler(event) {
    this.selectedTemplate = event.target.value;

  }
  ngOnInit() {
  this.test = new Date('2020/04/30 13:30 UTC');
  this.test = this.test.toISOString();
  console.log(this.test)
     this.user = this.authenticationService.user;
    this.dateFieldFrom = {isRange: false, singleDate: {jsDate: new Date(),formatted:formatDate(new Date(), 'dd/MM/yyyy', 'en')}};
    this.dateFieldTo = {isRange: false, singleDate: {jsDate: new Date(),formatted:formatDate(new Date(), 'dd/MM/yyyy', 'en')}};
    console.log(new Date().getHours());
    this.fromTime= {hour: new Date().getHours(), minute:new Date().getMinutes(), second: new Date().getSeconds()};
   this.toTime= {hour: new Date().getHours(), minute:new Date().getMinutes(), second: new Date().getSeconds()};
      this._route.queryParams.forEach(queryParams => {
      if (queryParams['page']) {
        this.page = queryParams['page'];
        console.log('Current param page: ', this.page);
      }
    });

 

    this.sharedDataService.scorecardFields.subscribe((fields) => {
      this.scorecardFields = fields;
      this.initScorecardFieldDropdowns();
    });
     this.sharedDataService.channelFields.subscribe((fields) => {
      this.channelArray = fields;
      console.log(this.channelArray)
    });

    this.sharedDataService.productFields.subscribe((fields) => {
      this.productArray = fields;
      console.log(this.productArray)
    });
    this.sharedDataService.usageStatusFields.subscribe((fields) => {
      this.statusArray = fields;
      console.log(this.statusArray)
    });
    //processed array
    this.sharedDataService.processedchannelFields.subscribe((fields) => {
      this.processchannelArray = fields;
      console.log(this.processchannelArray)
    });

    this.sharedDataService.processedproductFields.subscribe((fields) => {
      this.processproductArray = fields;
      console.log(this.processproductArray)
    });
    this.sharedDataService.processedusageStatusFields.subscribe((fields) => {
      this.processstatusArray = fields;
      console.log(this.processstatusArray)
    });
  }
     pageChanged(page) {
    console.log('Page changed: ' + this.page);
  }
  

  initScorecardFieldDropdowns() {
    this.scorecardSubFields = (this.scorecardFields[0]
        && this.scorecardFields[0].fields[0]) ? this.scorecardFields[0].fields : [];
    this.questionFormModel.fieldType = (this.scorecardFields[0]) ? this.scorecardFields[0].value : '';
    this.setScorecardSubFieldsData(this.scorecardSubFields[0] ? this.scorecardSubFields[0] : {});
  }

  onChangeScorecardSubField(scorecardSubField) {
     this.resetAll();
     this.questionFormModel.fieldValue = [];
     const selectedIndex = scorecardSubField.options.selectedIndex;
     this.questionFormModel.fieldName = scorecardSubField.options[selectedIndex].dataset.value;
     this.questionFormModel.dataType = scorecardSubField.options[selectedIndex].dataset.dataType;
     this.questionFormModel.fieldValue = scorecardSubField.options[selectedIndex].dataset.array;
     console.log(this.questionFormModel.fieldValue)
  }
  
  private setScorecardSubFieldsData({ fieldName, fieldLabel, fieldType,fieldValue }) {
    this.questionFormModel.fieldName = fieldName;
    this.questionFormModel.fieldLabel = fieldLabel;
    this.questionFormModel.dataType = fieldType;
    this.questionFormModel.fieldValue.push(fieldValue);
  }

  changeScorecardSubFields() {
    this.resetAll();
      this.itemsAsObjects = []

    this.scorecardSubFields = this.scorecardFields.find((fieldType) => fieldType.value === this.questionFormModel.fieldType).fields;
    this.setScorecardSubFieldsData(this.scorecardSubFields[0] ? this.scorecardSubFields[0] : {});
    console.log(this.questionFormModel.fieldType)
    if(this.questionFormModel.fieldType=="Processed"){
      this.rawUsage = false
      this.processed = true;
    }
    else{
      this.rawUsage = true
      this.processed = false;
    }
  }
  addNewQuestion(){
  console.log(this.questionFormModel.fieldValue)
      this.showFilterBlock = true;
      if(this.questionFormModel.fieldName == "RawUsageIdentifier"){
        this.primaryPlaceholder=this.translateService.instant('appHome.home.primaryRaw');
        this.secondaryPlaceholder=this.translateService.instant('appHome.home.secondaryRaw');
        this.subscribeInput = false;
        this.alphaInput = false;
        this.dateInput = false;
        this.channelInput = false;
        this.productInput = false;
        this.statusInput = false;
        this.rawUsageIdentifier = true;
        this.userInput = false;
      }
     if(this.questionFormModel.fieldName == "channel"){
        this.channelFinalArray = [];
        console.log(this.questionFormModel.fieldType)
        if(this.questionFormModel.fieldType =="RAW"){
            this.channelArray.forEach((channel: any) => {
                 this.channelFinalArray.push(channel);
           });
        }
        else{
            this.processchannelArray.forEach((channel: any) => {
                 this.channelFinalArray.push(channel);
           });
        }
        this.channelPrimaryPlaceholder=this.translateService.instant('appHome.home.primaryChannel');
        this.channelSecondaryPlaceholder=this.translateService.instant('appHome.home.secondaryChannel');
        this.channelInput = true;
        this.subscribeInput = false;
        this.alphaInput = false;
        this.dateInput = false;
        this.productInput = false;
        this.statusInput = false;
        this.rawUsageIdentifier = false;
        this.userInput = false;
     }
     if(this.questionFormModel.fieldName == "Status"){
        this.statusFinalArray = [];
        if(this.questionFormModel.fieldType =="RAW"){
            this.statusArray.forEach((status: any) => {
                 this.statusFinalArray.push(status);
           });
        }
        else{
            this.processstatusArray.forEach((status: any) => {
                 this.statusFinalArray.push(status);
           });
        }
        this.statusPrimaryPlaceholder=this.translateService.instant('appHome.home.primaryStatus')
        this.statusSecondaryPlaceholder=this.translateService.instant('appHome.home.secondaryStatus');
        this.statusInput = true;
        this.channelInput = false;
        this.subscribeInput = false;
        this.alphaInput = false;
        this.dateInput = false;
        this.productInput = false;
        this.rawUsageIdentifier = false;
        this.userInput = false;
        console.log(this.questionFormModel.fieldValue)
     }
     if(this.questionFormModel.fieldName == "ProductName"){
        console.log(this.questionFormModel.dataType)
        this.productFinalArray = [];
        if(this.questionFormModel.fieldType =="RAW"){
            this.productArray.forEach((product: any) => {
                 this.productFinalArray.push(product);
           });
        }
        else{
            this.processproductArray.forEach((product: any) => {
                 this.productFinalArray.push(product);
           });
        }
        this.productPrimaryPlaceholder=this.translateService.instant('appHome.home.primaryProduct');
        this.productSecondaryPlaceholder=this.translateService.instant('appHome.home.secondaryProduct');
        this.productInput = true;
        this.channelInput = false;
        this.subscribeInput = false;
        this.alphaInput = false;
        this.dateInput = false;
        this.statusInput = false;
        this.rawUsageIdentifier = false;
        this.userInput = false;
     }
     
     if(this.questionFormModel.fieldName == "SubscriberId"){
         this.subscribePrimaryPlaceholder=this.translateService.instant('appHome.home.primarySubscribe')
        this.subscribeSecondaryPlaceholder=this.translateService.instant('appHome.home.secondarySubscribe');
        this.userInput = false;
        this.subscribeInput = true;
        this.alphaInput = false;
        this.dateInput = false;
        this.channelInput = false;
        this.rawUsageIdentifier = false;
        this.statusInput = false;
        this.productInput = false;
     }
     if(this.questionFormModel.fieldName == "UserId"){

      this.userPrimaryPlaceholder=this.translateService.instant('appHome.home.primaryUser')
        this.userSecondaryPlaceholder=this.translateService.instant('appHome.home.secondaryUser');
        this.userInput = true;
        this.subscribeInput = false;
        this.alphaInput = false;
        this.dateInput = false;
        this.channelInput = false;
        this.rawUsageIdentifier = false;
        this.statusInput = false;
        this.productInput = false;
     }
     else if(this.questionFormModel.dataType == "string" && this.questionFormModel.fieldName != "RawUsageIdentifier"&&this.questionFormModel.fieldName!="channel"&&this.questionFormModel.fieldName != "ProductName" && this.questionFormModel.fieldName != "Status"){
     console.log(this.questionFormModel.fieldName)
        this.alphaInput = true;
        this.subscribeInput = false;
        this.dateInput = false;
        this.rawUsageIdentifier = false;
        this.channelInput = false;
        this.productInput = false;
        this.statusInput = false;
        this.userInput = false;

     }
     else if(this.questionFormModel.dataType == "DATE"){
     console.log(this.dateFieldFrom)
        this.alphaInput = false;
        this.subscribeInput = false;
        this.dateInput = true;
        this.rawUsageIdentifier = false;
        this.channelInput = false;
        this.statusInput = false;
        this.userInput = false;

     }
  }

private startsWithAt(control) { 
  if(isNaN(Number(control.value))){
      return {
                'startsWithAt@': true
            };
  }

        return null;
    }

    private endsWith$(control) {
        if (control.value.charAt(control.value.length - 1) !== '$') {
            return {
                'endsWith$': true
            };
        }

        return null;
    }

    public validators = [this.startsWithAt];

    public errorMessages = {
        'startsWithAt@': 'Identifiers should be in numbers',
    };
 onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
onItemDeSelect(item: any){
  console.log(item)
}
  resetAll(){
      this.alphaInput = false;
      this.subscribeInput = false;
      this.dateInput = false;
      this.rawUsageIdentifier = false;
      this.channelInput = false;
      this.productInput = false;
      this.statusInput = false;
      this.userInput = false;
      this.items = [];
      this.channelItems = [];
      this.productItems = [];
      this.statusItems = [];
      this.subscribeItems = [];
      this.userItems = [];
     

  }
   resetQuestion() {
    this.questionFormModel = { ...this.questionFormModelDefault };
    this.initScorecardFieldDropdowns();
    this.resetAll();
    this.itemsAsObjects = []

  }
  //download channel data
  fetchTableDetailsChannel(fieldType,fieldName,channelItems){
  console.log(channelItems)
  if( this.itemsAsObjects.findIndex((item) => item.fieldName === fieldName) < 0) {
    this.itemsAsObjects.push({fieldName:fieldName,listValue:channelItems,type:this.questionFormModel.dataType})

  }
  else{
        this.showAlert();
  }
  

  }
  //download product data
  fetchTableDetailsProduct(fieldType,fieldName,product){
               console.log(this.questionFormModel.dataType)
  if( this.itemsAsObjects.findIndex((item) => item.fieldName === fieldName) < 0) {
    this.itemsAsObjects.push({fieldName:fieldName,listValue:product,type:this.questionFormModel.dataType})
  }
  else{
        this.showAlert();
  }
      this.data = {
        usageType:fieldType,
        fieldName:fieldName,
        input:product
      }
      this.apiService.post('/dummyTable',this.data).subscribe((response) => {
          console.log(response)
          this.tableData = response;
          this.collectionSize = this.tableData.length
      });

  }

  fetchTableDetailsStatus(fieldType,fieldName,status){
  if( this.itemsAsObjects.findIndex((item) => item.fieldName === fieldName) < 0) {
    this.itemsAsObjects.push({fieldName:fieldName,listValue:status,type:this.questionFormModel.dataType})
  }
  else{
        this.showAlert();
  }
      this.data = {
        usageType:fieldType,
        fieldName:fieldName,
        input:status
      } 
    this.apiService.post('/dummyTable',this.data).subscribe((response) => {
          console.log(response)
          this.tableData = response;
          this.collectionSize = this.tableData.length
      });
  }

  fetchTableDetailsIdentifier(fieldType,fieldName,items){
    console.log(items)
     if( this.itemsAsObjects.findIndex((item) => item.fieldName === fieldName) < 0) {
        this.itemsAsObjects.push({fieldName:fieldName,listValue:items,type:this.questionFormModel.dataType})
      }
    else{
        this.showAlert();
    }
    this.data = {
        usageType:fieldType,
        fieldName:fieldName,
        input:this.rawUsageIdentifiers
    } 
    this.apiService.post('/dummyTable',this.data).subscribe((response) => {
          console.log(response)
          this.tableData = response;
          this.collectionSize = this.tableData.length
      });
  }

  fetchTableDetailsNum(fieldType,fieldName,input) {
  if( this.itemsAsObjects.findIndex((item) => item.fieldName === fieldName) < 0) {
        this.itemsAsObjects.push({fieldName:fieldName,listValue:input,type:this.questionFormModel.dataType})
      }
    else{
      this.showAlert();
    }
    if (input) {
      this.data = {
        usageType:fieldType,
        fieldName:fieldName,
        input:input
      } 
      this.displayTable = true;
      this.apiService.post('/dummyTable',this.data).subscribe((response) => {
          console.log(response)
          this.tableData = response;
          this.collectionSize = this.tableData.length
      });
    } 
  }
  fetchTableDetailsText(fieldType,fieldName,textInput) {
    if( this.itemsAsObjects.findIndex((item) => item.fieldName === fieldName) < 0) {
        this.itemsAsObjects.push({fieldName:fieldName,listValue:textInput,type:this.questionFormModel.dataType})
      }
    else{
        this.showAlert();
    }
      console.log(textInput)
      this.data = {
        usageType:fieldType,
        fieldName:fieldName,
        input:textInput
      } 
    if (textInput) {
      this.displayTable = true;
      this.apiService.post('/dummyTable',this.data).subscribe((response) => {
          console.log(response)
          this.tableData = response;
          this.collectionSize = this.tableData.length
      });
    } 
  }
  
    fetchTableDetailsFromTo(fieldType,fieldName,from,to,fromTime,toTime) {
      this.dateArray = [];
      this.fromDateRange = from.singleDate.jsDate.toDateString();
      this.toDateRange = to.singleDate.jsDate.toDateString();
      this.fromTimeInFormat=new Date(this.fromDateRange+" "+fromTime.hour.toString()+":"+fromTime.minute.toString()+":"+fromTime.second.toString()+" "+"UTC").toISOString();

      this.toTimeInFormat=new Date(this.toDateRange+" "+toTime.hour.toString()+":"+toTime.minute.toString()+":"+toTime.second.toString()+" "+"UTC").toISOString();
      console.log(this.toTimeInFormat)
      console.log(this.fromTimeInFormat)
        if( this.itemsAsObjects.findIndex((item) => item.fieldName === fieldName) < 0) {
          this.dateArray.push(this.fromTimeInFormat);
          this.dateArray.push(this.toTimeInFormat);
          console.log(this.dateArray)
          this.itemsAsObjects.push({fieldName:fieldName,listValue:this.dateArray,type:this.questionFormModel.dataType});          
        }
      else{
        this.showAlert();
      }
        this.date = {
         fromDate:from.singleDate.formatted,
         toDate:to.singleDate.formatted
        }
      this.data = {
        usageType:fieldType,
        fieldName:fieldName,
        input:this.date
      } 
        this.displayTable = true;
        this.apiService.post('/dummyTable',this.data).subscribe((response) => {
            console.log(response)
            this.tableData = response;
            this.collectionSize = this.tableData.length;

        });
  }
    downloadUsageInfo(fieldType,fieldValue){
      this.data = {
        "dateField": "orderedDate",
        "fromDate": "2020-01-13T06:09:30.026Z",
        "globalOperation": this.mode,
        "pageNumber": 0,
        "recordsPerPage": 10,
        "toDate": "2020-04-13T06:09:30.026Z",
        "universalQueryCriteria": [
          fieldValue
        ],
        "token":this.user.token
      }
      console.log(this.user.token)
      this.apiService.post('/dummyTable',this.data).subscribe((response) => {
              console.log(response)
              this.tableData = response;
              this.collectionSize = this.tableData.length;

          });
    }

    //modal

    showAlert() {
    this.SimpleModalService.addModal(AlertComponent, {title: 'Already added', message: 'Field is already added please remoive the field from list to add new!!!'});
  }

  //data picker


  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;

    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      console.log(this.fromDate)
    } else {
      this.toDate = null;
      this.fromDate = date;
      console.log(this.fromDate)
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }


}
