import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

  get(path: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}${path}`,
      this.httpOptions
    );
  }

  post(path: string, data = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      data,
      this.httpOptions
    );
  }

  put(path: string, data = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      data,
      this.httpOptions
    );
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}${path}`,
      this.httpOptions
    );
  }
}
