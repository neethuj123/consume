import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements OnInit, OnChanges {
  @Input() comment;
  @Input() maxLength = 100;

  currentText;
  showReadMoreLessLink = false;
  isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.determineView();
  }

  toggleView() {
    this.isCollapsed = !this.isCollapsed;
    this.determineView();
  }

  determineView() {
    if (!this.comment || this.comment.length <= this.maxLength) {
      this.currentText = this.comment;
      this.showReadMoreLessLink = false;
      return;
    }
    this.showReadMoreLessLink = true;
    if (this.isCollapsed === true) {
      this.currentText = this.comment.substring(0, this.maxLength) + '...';
    } else {
      this.currentText = this.comment;
    }
  }
}
