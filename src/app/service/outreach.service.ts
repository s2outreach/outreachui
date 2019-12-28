import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutreachService {

  private baseURL = environment.baseURL;
  private authserver = 'authserver';
  private eventserver = 'eventserver';
  private emailserver = 'emailserver';
  private logserver = 'logserver';
  // private headers = HttpHeaders;

  constructor(private http: HttpClient) { }

  public register(reqObj) {
    return this.http.post(this.baseURL + this.authserver + '/v1/register', reqObj)
    .pipe(
    map(resp => {
      return resp;
    } ));
  }

  public authenticate(username, password) {
    // const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password)});
    return this.http.post(this.baseURL + this.authserver + '/v1/authenticate', null, {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(username + ':' + password)),
      observe: 'response'})
    .pipe(
      map(resp  => {
        return resp;
      }));
  }

  public getUserCount() {
    return this.http.get(this.baseURL + this.eventserver + '/v1/getUserCount')
    .pipe(
      map(resp  => {
        return resp;
      }));
  }

  public addEvent(reqObj) {
    return this.http.post(this.baseURL + this.eventserver + '/v1/addEvent', reqObj )
    .pipe(
      map(resp  => {
        return resp;
      }));
  }

  public getAllEvents() {
    return this.http.get(this.baseURL + this.eventserver + '/v1/getAllEvents')
    .pipe(
    map(resp => {
      return resp;
    } ));
  }

  public getEventReport() {
    return this.http.get(this.baseURL + this.eventserver + '/v1/getEventReport')
    .pipe(
    map(resp => {
      return resp;
    } ));
  }

  public getUserReport() {
    return this.http.get(this.baseURL + this.eventserver + '/v1/getUserReport')
    .pipe(
    map(resp => {
      return resp;
    } ));
  }

  public registerUser(reqObj) {
    return this.http.post(this.baseURL + this.eventserver + '/v1/addUserForEvent', reqObj )
    .pipe(
      map(resp  => {
        return resp;
      }));
  }

  public getRegisteredEvents(userid) {
    return this.http.get(this.baseURL + this.eventserver + '/v1/getEventsForUser?userid=' + userid)
    .pipe(
    map(resp => {
      return resp;
    } ));
  }

  public getLog() {
    return this.http.get(this.baseURL + this.logserver + '/v1/getAllLogs')
    .pipe(
    map(resp => {
      return resp;
    } ));
  }

  public sendNewEventMail(reqObj) {
    return this.http.post(this.baseURL + this.emailserver + '/v1/sendNewEventMail', reqObj )
    .pipe(
      map(resp  => {
        return resp;
      }));
  }

  public sendReportMail(reqObj) {
    return this.http.post(this.baseURL + this.emailserver + '/v1/sendReportInsightMail', reqObj )
    .pipe(
      map(resp  => {
        return resp;
      }));
  }
}
