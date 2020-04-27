import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss']
})
export class HomeNavComponent implements OnInit {
  @Input() iconClassName: string;
  @Input() labelKey: string;

  constructor() { }

  ngOnInit() {
  }

}
