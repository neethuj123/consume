import {
    Component,
    OnInit,
    Injectable
} from '@angular/core';
import {
    ApiService
} from './../../core/api.service';
import {
    formatDate
} from '@angular/common';
import {
    SharedDataService
} from './../../shared/shared-data.service';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import {
    TranslateService
} from '@ngx-translate/core';
import {
    NgbModule,
    NgbPaginationModule,
    NgbDate,
    NgbCalendar,
    NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';
import {
    environment
} from './../../../environments/environment';
import {
    HttpClient,
    HttpParams
} from '@angular/common/http';
import {
    IAngularMyDpOptions,
    IMyDateModel
} from 'angular-mydatepicker';
import {
    SimpleModalComponent
} from 'ngx-simple-modal';
import {
    AlertComponent
} from './../../modal/alert/alert.component';
import {
    SimpleModalService
} from 'ngx-simple-modal';
import {
    NgbDatepickerI18n,
    NgbTimeStruct,
    NgbDateStruct,
    NgbDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';
import {
    IDropdownSettings
} from 'ng-multiselect-dropdown';
import {
    AuthenticationService
} from './../../core/authentication.service';
import {
    DatePipe
} from '@angular/common'


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    fromTime: NgbTimeStruct;
    toTime: NgbTimeStruct;
    user;
    data = {};
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
    page = 1;
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
    invalidRange = false;
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
    fieldFormatValues = [];
    hoveredDate: NgbDate | null = null;
    rawUsage = true;
    processed = false;
    fromDate: NgbDate | null;
    toDate: NgbDate | null;
    defaultLang = "fr";
    channelArray = [];
    productArray;
    statusArray;
    processchannelArray;
    processproductArray;
    processstatusArray;
    channelFinalArray;
    statusFinalArray;
    productFinalArray;
    mode = "or";
    dateFieldName = null;
    dateFieldFrom: IMyDateModel = null;
    dateFieldTo: IMyDateModel = null;
    public mytime: Date = new Date();
    currentYear: any = this.mytime.getUTCFullYear();
    currentDate: any = this.mytime.getUTCDate();
    currentMonth: any = this.mytime.getUTCMonth() + 1; //months from 1-12
    startDate: IAngularMyDpOptions = {
        dateFormat: 'dd/mm/yyyy'

    };
    endDate: IAngularMyDpOptions = {
        dateFormat: 'dd/mm/yyyy'

    };
    alphaNumericText;
    fromTimeInFormat=null;
    toTimeInFormat=null;
    private questionFormModelDefault = {
        fieldType: '',
        fieldName: '',
        dataType: '',
        fieldLabel: '',
        fieldValue: []
    };
    questionFormModel = {
        ...this.questionFormModelDefault
    };

    get tableDetail() {
        return this.tableData.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
    }

    constructor(private sharedDataService: SharedDataService,
        private apiService: ApiService,
        private translateService: TranslateService,
        private _route: ActivatedRoute,
        private calendar: NgbCalendar,
        public formatter: NgbDateParserFormatter,
        private config: NgbDatepickerConfig,
        private SimpleModalService: SimpleModalService,
        private authenticationService: AuthenticationService,
        public datepipe: DatePipe
    ) {
        this.defaultLang = environment.defaultLang;
    }

    selectChangeHandler(event) {
        this.selectedTemplate = event.target.value;

    }
    ngOnInit() {

        this.user = this.authenticationService.user;
        this.dateFieldFrom = {
            isRange: false,
            singleDate: {
                jsDate: new Date(),
                formatted: formatDate(new Date(), 'dd/MM/yyyy', 'en')
            }
        };
        this.dateFieldTo = {
            isRange: false,
            singleDate: {
                jsDate: new Date(),
                formatted: formatDate(new Date(), 'dd/MM/yyyy', 'en')
            }
        };
        this.fromTime = {
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
            second: new Date().getSeconds()
        };
        this.toTime = {
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
            second: new Date().getSeconds()
        };
        this._route.queryParams.forEach(queryParams => {
            if (queryParams['page']) {
                this.page = queryParams['page'];
                console.log('Current param page: ', this.page);
            }
        });



        this.sharedDataService.scorecardFields.subscribe((fields) => {
            this.scorecardFields = fields;
                        console.log(this.scorecardFields)

            this.initScorecardFieldDropdowns();
        });
        this.sharedDataService.channelFields.subscribe((fields) => {
            this.channelArray = fields;
        });

        this.sharedDataService.productFields.subscribe((fields) => {
            this.productArray = fields;
        });
        this.sharedDataService.usageStatusFields.subscribe((fields) => {
            this.statusArray = fields;
        });
        //processed array
        this.sharedDataService.processedchannelFields.subscribe((fields) => {
            this.processchannelArray = fields;
        });

        this.sharedDataService.processedproductFields.subscribe((fields) => {
            this.processproductArray = fields;
        });
        this.sharedDataService.processedusageStatusFields.subscribe((fields) => {
            this.processstatusArray = fields;
        });
    }
    pageChanged(page) {
        console.log('Page changed: ' + this.page);
    }


    initScorecardFieldDropdowns() {
        this.scorecardSubFields = (this.scorecardFields[0] &&
            this.scorecardFields[0].fieldDetailsList[0]) ? this.scorecardFields[0].fieldDetailsList : [];
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
    }

    private setScorecardSubFieldsData({
        fieldName,
        fieldLabel,
        fieldType,
        fieldValue
    }) {
        this.questionFormModel.fieldName = fieldName;
        this.questionFormModel.fieldLabel = fieldLabel;
        this.questionFormModel.dataType = fieldType;
    }

    changeScorecardSubFields() {
        this.resetAll();
        this.itemsAsObjects = []

        this.scorecardSubFields = this.scorecardFields.find((fieldType) => fieldType.value === this.questionFormModel.fieldType).fieldDetailsList;
        this.setScorecardSubFieldsData(this.scorecardSubFields[0] ? this.scorecardSubFields[0] : {});
        if (this.questionFormModel.fieldType == "PROCESSED") {
            this.rawUsage = false
            this.processed = true;
        } else {
            this.rawUsage = true
            this.processed = false;
        }
    }
    channelChange(channelItems,channelFinalArray){
        if(channelItems.length == channelFinalArray.length){
            this.channelPrimaryPlaceholder = this.translateService.instant('appHome.home.NoData');
        }
        else{
            this.channelPrimaryPlaceholder = this.translateService.instant('appHome.home.primaryChannel');  
        }       
    }
    productChange(productItems,productFinalArray){
         if(productItems.length == productFinalArray.length){
            this.productPrimaryPlaceholder = this.translateService.instant('appHome.home.NoData');
        }
        else{
            this.productPrimaryPlaceholder = this.translateService.instant('appHome.home.primaryProduct');  
        }    
    }
    statusChange(statusItems,statusFinalArray){
        if(statusItems.length == statusFinalArray.length){
            this.statusPrimaryPlaceholder = this.translateService.instant('appHome.home.NoData');
        }
        else{
            this.statusPrimaryPlaceholder = this.translateService.instant('appHome.home.primaryStatus');  
        }  
    }
    addNewQuestion() {
        this.invalidRange = false;
        this.showFilterBlock = true;
        if (this.questionFormModel.fieldName == "rawUsageIdentifier") {
            this.primaryPlaceholder = this.translateService.instant('appHome.home.primaryRaw');
            this.secondaryPlaceholder = this.translateService.instant('appHome.home.secondaryRaw');
            this.subscribeInput = false;
            this.alphaInput = false;
            this.dateInput = false;
            this.channelInput = false;
            this.productInput = false;
            this.statusInput = false;
            this.rawUsageIdentifier = true;
            this.userInput = false;
        }
        if (this.questionFormModel.fieldName == "channel") {
            this.channelFinalArray = [];
            if (this.questionFormModel.fieldType == "Raw") {
                this.channelArray.forEach((channel: any) => {
                    this.channelFinalArray.push(channel);
                });
                if( this.channelFinalArray.length == 0){
                    this.channelSecondaryPlaceholder = this.translateService.instant('appHome.home.NoData');
                }
                else{
                 this.channelSecondaryPlaceholder = this.translateService.instant('appHome.home.secondaryChannel');
                }
            } else {
                this.processchannelArray.forEach((channel: any) => {
                    this.channelFinalArray.push(channel);
                });
                if( this.channelFinalArray.length == 0){
                    this.channelSecondaryPlaceholder = this.translateService.instant('appHome.home.NoData');
                }
                else{
                 this.channelSecondaryPlaceholder = this.translateService.instant('appHome.home.secondaryChannel');
                }
            }
           
            this.channelInput = true;
            this.subscribeInput = false;
            this.alphaInput = false;
            this.dateInput = false;
            this.productInput = false;
            this.statusInput = false;
            this.rawUsageIdentifier = false;
            this.userInput = false;
        }
        if (this.questionFormModel.fieldName == "status") {
            this.statusFinalArray = [];
            if (this.questionFormModel.fieldType == "Raw") {
                this.statusArray.forEach((status: any) => {
                    this.statusFinalArray.push(status);
                });
                if( this.statusFinalArray.length == 0){
                    this.statusSecondaryPlaceholder = this.translateService.instant('appHome.home.NoData');
                }
                else{
                 this.statusSecondaryPlaceholder = this.translateService.instant('appHome.home.secondaryStatus');
                }
            } else {
                this.processstatusArray.forEach((status: any) => {
                    this.statusFinalArray.push(status);
                });
                if( this.statusFinalArray.length == 0){
                    this.statusSecondaryPlaceholder = this.translateService.instant('appHome.home.NoData');
                }
                else{
                  this.statusSecondaryPlaceholder = this.translateService.instant('appHome.home.secondaryStatus');
                }
            }
            this.statusInput = true;
            this.channelInput = false;
            this.subscribeInput = false;
            this.alphaInput = false;
            this.dateInput = false;
            this.productInput = false;
            this.rawUsageIdentifier = false;
            this.userInput = false;
        }
        if (this.questionFormModel.fieldName == "productName") {
            this.productFinalArray = [];
            if (this.questionFormModel.fieldType == "Raw") {
                this.productArray.forEach((product: any) => {
                    this.productFinalArray.push(product);
                });
                if( this.productFinalArray.length == 0){
                    this.productSecondaryPlaceholder = this.translateService.instant('appHome.home.NoData');
                }
                else{
                  this.productSecondaryPlaceholder = this.translateService.instant('appHome.home.secondaryProduct');
                }
            } else {
                this.processproductArray.forEach((product: any) => {
                    this.productFinalArray.push(product);
                });
                if( this.productFinalArray.length == 0){
                    this.productSecondaryPlaceholder = this.translateService.instant('appHome.home.NoData');
                }
                else{
                    this.productSecondaryPlaceholder = this.translateService.instant('appHome.home.secondaryProduct');
                }
            }
            this.productInput = true;
            this.channelInput = false;
            this.subscribeInput = false;
            this.alphaInput = false;
            this.dateInput = false;
            this.statusInput = false;
            this.rawUsageIdentifier = false;
            this.userInput = false;
        }

        if (this.questionFormModel.fieldName == "subscriberId") {
            this.subscribePrimaryPlaceholder = this.translateService.instant('appHome.home.primarySubscribe')
            this.subscribeSecondaryPlaceholder = this.translateService.instant('appHome.home.secondarySubscribe');
            this.userInput = false;
            this.subscribeInput = true;
            this.alphaInput = false;
            this.dateInput = false;
            this.channelInput = false;
            this.rawUsageIdentifier = false;
            this.statusInput = false;
            this.productInput = false;
        }
        if (this.questionFormModel.fieldName == "userId") {

            this.userPrimaryPlaceholder = this.translateService.instant('appHome.home.primaryUser')
            this.userSecondaryPlaceholder = this.translateService.instant('appHome.home.secondaryUser');
            this.userInput = true;
            this.subscribeInput = false;
            this.alphaInput = false;
            this.dateInput = false;
            this.channelInput = false;
            this.rawUsageIdentifier = false;
            this.statusInput = false;
            this.productInput = false;
        } else if (this.questionFormModel.dataType == "string" && this.questionFormModel.fieldName != "rawUsageIdentifier" && this.questionFormModel.fieldName != "channel" && this.questionFormModel.fieldName != "productName" && this.questionFormModel.fieldName != "status") {
            this.alphaInput = true;
            this.subscribeInput = false;
            this.dateInput = false;
            this.rawUsageIdentifier = false;
            this.channelInput = false;
            this.productInput = false;
            this.statusInput = false;
            this.userInput = false;

        } else if (this.questionFormModel.fieldName == "contractDate") {
            this.alphaInput = false;
            this.subscribeInput = false;
            this.dateInput = true;
            this.rawUsageIdentifier = false;
            this.channelInput = false;
            this.statusInput = false;
            this.userInput = false;

        }
    }

    //validations

    private alphaNum(control) {
        if (!control.value.match(/^[a-z0-9]+$/i)) {
            return {
                'alphaNumeric': true
            };
        }
        return null;
    }
    public validators = [this.alphaNum];

    public errorMessages = {
        'alphaNumeric': "La valeur d'entrée doit être alphanumérique / numérique"
    };

    //userId validation


    private onlyInteger(control) {
        if (!control.value.match(/^[0-9]+$/)) {
            return {
                'Numeric': true
            };
        }
        return null;
    }
    public userIdvalidators = [this.onlyInteger];

    public usererrorMessages = {
        'Numeric': "L'ID utilisateur doit être entier"
    };

    resetAll() {
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
        this.dateFieldFrom = {
            isRange: false,
            singleDate: {
                jsDate: new Date(),
                formatted: formatDate(new Date(), 'dd/MM/yyyy', 'en')
            }
        };
        this.dateFieldTo = {
            isRange: false,
            singleDate: {
                jsDate: new Date(),
                formatted: formatDate(new Date(), 'dd/MM/yyyy', 'en')
            }
        };
        this.fromTime = {
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
            second: new Date().getSeconds()
        };
        this.toTime = {
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
            second: new Date().getSeconds()
        };


    }
    resetQuestion() {
        this.questionFormModel = {
            ...this.questionFormModelDefault
        };
        this.initScorecardFieldDropdowns();
        this.resetAll();
        this.itemsAsObjects = []

    }
    //download channel data
    fetchTableDetailsChannel(fieldType, fieldName, channelItems) {
        if (this.itemsAsObjects.findIndex((item) => item.fieldName === fieldName) < 0) {
            this.itemsAsObjects.push({
                fieldName: fieldName,
                listValue: channelItems,
                type: this.questionFormModel.dataType
            })

        } else {
            this.showAlert();
        }


    }
    //download product data
    fetchTableDetailsProduct(fieldType, fieldName, product) {
        if (this.itemsAsObjects.findIndex((item) => item.fieldName === fieldName) < 0) {
            this.itemsAsObjects.push({
                fieldName: fieldName,
                listValue: product,
                type: this.questionFormModel.dataType
            })
        } else {
            this.showAlert();
        }
    }

    fetchTableDetailsStatus(fieldType, fieldName, status) {
        if (this.itemsAsObjects.findIndex((item) => item.fieldName === fieldName) < 0) {
            this.itemsAsObjects.push({
                fieldName: fieldName,
                listValue: status,
                type: this.questionFormModel.dataType
            })
        } else {
            this.showAlert();
        }
    }

    fetchTableDetailsIdentifier(fieldType, fieldName, items) {
        if (this.itemsAsObjects.findIndex((item) => item.fieldName === fieldName) < 0) {
            this.itemsAsObjects.push({
                fieldName: fieldName,
                listValue: items,
                type: this.questionFormModel.dataType
            })
        } else {
            this.showAlert();
        }
    }

    fetchTableDetailsNum(fieldType, fieldName, input) {
        if(this.questionFormModel.dataType=='int'){
          console.log(input)
          input = input.map(function(v) {
            return parseInt(v, 10);
          });
        }
        if (this.itemsAsObjects.findIndex((item) => item.fieldName === fieldName) < 0) {
            this.itemsAsObjects.push({
                fieldName: fieldName,
                listValue: input,
                type: this.questionFormModel.dataType
            })
        } else {
            this.showAlert();
        }
    }
    fetchTableDetailsText(fieldType, fieldName, textInput) {
        if (this.itemsAsObjects.findIndex((item) => item.fieldName === fieldName) < 0) {
            this.itemsAsObjects.push({
                fieldName: fieldName,
                listValue: textInput,
                type: this.questionFormModel.dataType
            })
        } else {
            this.showAlert();
        }
    }
    onStartDateChanged(dateFieldFrom) {
        this.invalidRange = false;

    }
    onEndDateChanged(dateFieldTo) {
        this.invalidRange = false;
    }
    fetchTableDetailsFromTo(fieldType, fieldName, from, to, fromTime, toTime) {
        this.invalidRange = false;
        this.dateArray = [];
        this.dateFieldName = fieldName;

        const date1Obj = new Date(from.singleDate.jsDate.getYear(), from.singleDate.jsDate.getMonth(), from.singleDate.jsDate.getDay());

        const date2Obj = new Date(to.singleDate.jsDate.getYear(), to.singleDate.jsDate.getMonth(), to.singleDate.jsDate.getDay());

        this.fromDateRange = from.singleDate.jsDate.toDateString();
        this.toDateRange = to.singleDate.jsDate.toDateString();
        this.fromTimeInFormat = new Date(this.fromDateRange + " " + fromTime.hour.toString() + ":" + fromTime.minute.toString() + ":" + fromTime.second.toString() + " " + "UTC").toISOString();

        this.toTimeInFormat = new Date(this.toDateRange + " " + toTime.hour.toString() + ":" + toTime.minute.toString() + ":" + toTime.second.toString() + " " + "UTC").toISOString();
        if (!(date1Obj.getTime() >= date2Obj.getTime())) {
            this.invalidRange = true;
        } else {
            if (this.itemsAsObjects.findIndex((item) => item.fieldName === fieldName) < 0) {
                this.dateArray.push(this.fromTimeInFormat);
                this.dateArray.push(this.toTimeInFormat);
                this.itemsAsObjects.push({
                    fieldName: fieldName,
                    listValue: this.dateArray,
                    type: this.questionFormModel.dataType
                });
            } else {
                this.showAlert();
            }
        }
        this.date = {
            fromDate: from.singleDate.formatted,
            toDate: to.singleDate.formatted
        }
        this.data = {
            usageType: fieldType,
            fieldName: fieldName,
            input: this.date
        }
    }

    downloadUsageInfo(fieldType, fieldValue) {
        this.fieldFormatValues = [];
        fieldValue.forEach((values: any) => {
            this.fieldFormatValues.push(values);
        });
        this.fieldFormatValues = this.fieldFormatValues.filter(({
            fieldName
        }) => fieldName !== 'contractDate');
        this.data = {
            "dateField": this.dateFieldName,
            "fromDate": this.toTimeInFormat,
            "globalOperation": this.mode,
            "pageNumber": 0,
            "recordsPerPage": 0,
            "toDate":this.fromTimeInFormat,
            "universalQueryCriteria": 
                this.fieldFormatValues
            
        }
        this.apiService.post('/downlaodData', this.data).subscribe((response) => {
        
            if(response.data==null){
                    this.showNoData();
            }
        });
    }

    //modal
    showNoData() {
        this.SimpleModalService.addModal(AlertComponent, {
            message: 'Aucune donnée disponible pour ces valeurs de champ !!!'
        });
    }
    showAlert() {
        this.SimpleModalService.addModal(AlertComponent, {
            title: 'Déjà ajouté',
            message: 'Le champ est déjà ajouté, veuillez le supprimer de la liste pour en ajouter de nouveaux !!!'
        });
    }
}