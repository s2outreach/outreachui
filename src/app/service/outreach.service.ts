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
    return this.http.post(this.baseURL + this.authserver + '/register', reqObj)
    .pipe(
    map(resp => {
      return resp;
    } ));
  }

  public authenticate(username, password) {
    // const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password)});
    return this.http.post(this.baseURL + this.authserver + '/authenticate', null, {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(username + ':' + password)),
      observe: 'response'})
    .pipe(
      map(resp  => {
        return resp;
      }));
  }

  public getUserCount() {
    return this.http.get(this.baseURL + this.eventserver + '/getUserCount')
    .pipe(
      map(resp  => {
        return resp;
      }));
  }

  public addEvent(reqObj) {
    return this.http.post(this.baseURL + this.eventserver + '/addEvent', reqObj )
    .pipe(
      map(resp  => {
        return resp;
      }));
  }

  public getAllEvents() {
    return this.http.get(this.baseURL + this.eventserver + '/getAllEvents')
    .pipe(
    map(resp => {
      return resp;
    } ));
  }

  public getEventReport() {
    return this.http.get(this.baseURL + this.eventserver + '/getEventReport')
    .pipe(
    map(resp => {
      return resp;
    } ));
  }

  public getUserReport() {
    return this.http.get(this.baseURL + this.eventserver + '/getUserReport')
    .pipe(
    map(resp => {
      return resp;
    } ));
  }

  public registerUser(reqObj) {
    return this.http.post(this.baseURL + this.eventserver + '/addUserForEvent', reqObj )
    .pipe(
      map(resp  => {
        return resp;
      }));
  }

  public getRegisteredEvents(userid) {
    return this.http.get(this.baseURL + this.eventserver + '/getEventsForUser?userid=' + userid)
    .pipe(
    map(resp => {
      return resp;
    } ));
  }

  public getLog() {
    return this.http.get(this.baseURL + this.logserver + '/getAllLogs')
    .pipe(
    map(resp => {
      return resp;
    } ));
  }

  public sendNewEventMail(reqObj) {
    return this.http.post(this.baseURL + this.emailserver + '/sendNewEventMail', reqObj )
    .pipe(
      map(resp  => {
        return resp;
      }));
  }

}
