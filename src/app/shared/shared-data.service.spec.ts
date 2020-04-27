import { environment } from './../../environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SharedDataService } from './shared-data.service';

describe('SharedDataService', () => {
  let httpTestingController: HttpTestingController;
  let service: SharedDataService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  beforeEach(() => {
    service = TestBed.get(SharedDataService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set user id', () => {
    service.scorecardUserId = 123;
    expect(service.scorecardUserId).toEqual(123);
  });

  it('should set and get search user id', () => {
    service.searchedUserId = 'U000123';
    expect(service.searchedUserId).toEqual('U000123');
  });

  it('should init scorecard fields', () => {
    service.initScorecardFields();
    const req = httpTestingController.expectOne(`${environment.apiUrl}/scorecardfields`);
    req.flush({scorecardfields: ['fields']});

    service.scorecardFields.subscribe((mockData: any) => {
      expect(mockData.scorecardfields).toEqual(['fields']);
    });
  });

  it('should init NAF codes', () => {
    service.fetchAllNAFCodes();
    const req = httpTestingController.expectOne(`${environment.apiUrl}/codeNafFields`);
    req.flush({1234: 'Test NAF code'});

    service.nafCodes.subscribe((mockData: any) => {
      expect(mockData).toEqual([{ code: '1234', label: 'Test NAF code' }]);
    });
  });

  it('should fetch all scorecard templates', () => {
    service.fetchAllScorecardTemplatesList();
    const req = httpTestingController.expectOne(`${environment.apiUrl}/templateList`);
    req.flush([{scoreCardId: 1, scoreCardLabel: 'one'}]);

    service.scorecardTemplatesList.subscribe((mockData: any) => {
      expect(mockData).toEqual([{scoreCardId: 1, scoreCardLabel: 'one'}]);
    });
  });

  it('should init NAF codes - check for else case', () => {
    const mockObject = {1234: 'Test NAF code', hasOwnProperty: () => false};

    service.fetchAllNAFCodes();

    const req = httpTestingController.expectOne(`${environment.apiUrl}/codeNafFields`);
    req.flush(mockObject);

    service.nafCodes.subscribe((mockData: any) => {
      expect(mockData).toEqual([]);
    });
  });
});
