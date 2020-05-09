import { AuthenticationService } from './../../core/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  currentYear;
  username;
  password;
  invalidLogin = false;
  validated;
  showLoginForm = false;
  showLoginLoading = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    const user = this.authenticationService.user;
    if (user) {
      this.router.navigateByUrl('/home');
    } 
  }

  validateInput() {
    this.validated = true;
    return this.username !== undefined && this.username !== '' && this.password !== undefined && this.password !== '';
  }

  login() {
    this.invalidLogin = false;
    this.showLoginLoading = true;
    if (this.validateInput()) {
      this.authenticationService.login(this.username, this.password)
        .subscribe(data => {
            this.router.navigateByUrl('/home');
            this.showLoginLoading = false;
        }, () => {
            this.invalidLogin = true;
        });
    }
  }


}
