import { TestBed } from '@angular/core/testing';

import { UtilityService } from './utility.service';

describe('UtilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilityService = TestBed.get(UtilityService);
    expect(service).toBeTruthy();
  });

  it('should process scorecard data', () => {
    const service: UtilityService = TestBed.get(UtilityService);
    const testScorecard = {
      dataQuestions: [{
        dataAnswers: [{ score: 100, showEditOption: true }]
      }, {
        dataAnswers: []
      }],
      decisionGrid: [{ decision: 'Good', showEditOption: true }]
    };

    expect(service.processScorecardData(testScorecard)).toEqual({
      dataQuestions: [{
        dataAnswers: [{ score: 100 }]
      }, {
        dataAnswers: []
      }],
      decisionGrid: [{ decision: 'Good' }]
    });
  });

  it('should sort decision grid with null values', () => {
    const service: UtilityService = TestBed.get(UtilityService);
    expect(service.decisionGridSort({from: null}, {from: 10})).toEqual(-1);
    expect(service.decisionGridSort({from: 10}, {from: null})).toEqual(1);
    expect(service.decisionGridSort({from: 15}, {from: 10})).toEqual(5);
    expect(service.decisionGridSort({from: 10}, {from: 15})).toEqual(-5);
  });
});
