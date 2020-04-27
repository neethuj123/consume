import { SharedDataService } from './../../../shared/shared-data.service';
import { AuthenticationService } from './../../../core/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  loggedInUserDetails;
  isUserDropdownOpen = false;
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe((user) => {
      this.loggedInUserDetails = user;
    });
  }

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  logOut($event) {
    $event.preventDefault();
    this.authenticationService.logout();
  }
}
