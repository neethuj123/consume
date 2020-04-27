import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnChanges {
userComment;
 @Input() showModal;
 @Input() popUpInput;
 @Output() closePopup = new EventEmitter();
  constructor() { }
  ngOnChanges() {
    this.userComment = this.popUpInput.comment;
  }

  ngOnInit() {
    this.userComment = this.popUpInput.comment;
  }
  closePopUp(confirm) {
    const popUpOutput = {
    confirm,
    userComment : this.userComment
  };
    this.closePopup.emit(popUpOutput);
    this.userComment = '';
  }

}
