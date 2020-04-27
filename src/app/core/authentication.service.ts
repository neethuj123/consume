import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private apiService: ApiService, private router: Router) {
        this.currentUserSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('user')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get user() {
        return this.currentUserSubject.value;
    }

    public get userRole() {
        return (this.currentUserSubject.value) ? this.currentUserSubject.value.userRole : null;
    }

    login(userName: string, password: string) {
        return this.apiService.post('/../user/login', {userName, password})
                .pipe(map(user => {
                    this.setUserDetails(user);
                    return user;
                }));
    }

    logout() {
        this.apiService.get('/user/logout').subscribe(() => {
            this.invalidateUser();
        });
    }

    private setUserDetails(user) {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    public invalidateUser() {
        sessionStorage.removeItem('user');
        this.currentUserSubject.next(null);

        this.router.navigateByUrl('/login');
    }
}
