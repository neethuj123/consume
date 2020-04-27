import { environment } from './../../environments/environment';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let httpTestingController: HttpTestingController;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ApiService ]
    });

    apiService = TestBed.get(ApiService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should fetch data using GET method', () => {
    const testData = { name: 'Test Data' };

    apiService.get('/test')
    .subscribe(data =>
      expect(data).toEqual(testData)
    );

    const req = httpTestingController.expectOne(`${environment.apiUrl}/test`);
    req.flush(testData);

    expect(req.request.method).toEqual('GET');
    httpTestingController.verify();
  });

  it('should create using POST method', () => {
    const testData = { name: 'Test Data' };

    apiService.post('/test', testData)
    .subscribe(data =>
      expect(data).toEqual(testData)
    );

    const req = httpTestingController.expectOne(`${environment.apiUrl}/test`);
    req.flush(testData);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testData);

    httpTestingController.verify();
  });

  it('should create using POST method with default param', () => {
    const testData = {};

    apiService.post('/test')
    .subscribe(data =>
      expect(data).toEqual(testData)
    );

    const req = httpTestingController.expectOne(`${environment.apiUrl}/test`);
    req.flush(testData);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testData);

    httpTestingController.verify();
  });

  it('should update using PUT method', () => {
    const testData = { name: 'Test Data' };

    apiService.put('/test', testData)
    .subscribe(data =>
      expect(data).toEqual(testData)
    );

    const req = httpTestingController.expectOne(`${environment.apiUrl}/test`);
    req.flush(testData);

    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(testData);

    httpTestingController.verify();
  });

  it('should update using PUT method with default param', () => {
    const testData = {};

    apiService.put('/test')
    .subscribe(data =>
      expect(data).toEqual(testData)
    );

    const req = httpTestingController.expectOne(`${environment.apiUrl}/test`);
    req.flush(testData);

    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(testData);

    httpTestingController.verify();
  });

  it('should delete using DELETE method', () => {
    const testData = { name: 'Test Data' };

    apiService.delete('/test')
    .subscribe(data =>
      expect(data).toEqual(testData)
    );

    const req = httpTestingController.expectOne(`${environment.apiUrl}/test`);
    req.flush(testData);

    expect(req.request.method).toEqual('DELETE');

    httpTestingController.verify();
  });
});
