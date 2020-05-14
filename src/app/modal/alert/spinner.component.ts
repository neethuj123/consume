import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface SpinnerModel {
  title?: string;
  message: string;
}

@Component({
  selector: 'spinner',
  template: `
    <div class="modal-content">
      <div class="modal-body">
        <p>{{message || 'TADAA-AM!'}}</p>
      </div>
      <div>
        <button type="button" class="modal-close btn btn-primary" (click)="close()">OK</button>
      </div>
    </div>
  `
})
export class SpinnerComponent extends SimpleModalComponent<SpinnerModel, null> implements SpinnerModel {
  title: string;
  message: string;
  constructor() {
    super();
  }
}
