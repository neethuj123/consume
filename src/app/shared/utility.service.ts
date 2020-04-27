import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  processScorecardData(scorecard) {
    const data = JSON.parse(JSON.stringify(scorecard));

    if (data.dataQuestions && data.dataQuestions.length > 0) {
      for (const questions of data.dataQuestions) {
        if (questions.dataAnswers && questions.dataAnswers.length > 0) {
          for (const answers of questions.dataAnswers) {
            delete answers.showEditOption;
          }
        }
      }
    }

    if (data.decisionGrid && data.decisionGrid.length > 0) {
      for (const decisionGrid of data.decisionGrid) {
        delete decisionGrid.showEditOption;
      }
    }

    return data;
  }

  decisionGridSort(a, b) {
    return (a.from === null || a.from === '' || a.from === undefined) ?
      -1 : (b.from === null || b.from === '' || b.from === undefined) ?
      1 : (a.from - b.from);
  }
}
