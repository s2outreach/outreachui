import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public eventAdded: EventEmitter<any> = new EventEmitter<any>();
  public volunteerRegistered: EventEmitter<any> = new EventEmitter<any>();
  public userAdded: EventEmitter<any> = new EventEmitter<any>();
  public eventToDashboard: EventEmitter<any> = new EventEmitter<any>();
  public eventReportToDashboard: EventEmitter<any> = new EventEmitter<any>();
  public voluteerReportToDashboard: EventEmitter<any> = new EventEmitter<any>();
  public volunteerRegisteredEvents: EventEmitter<any> = new EventEmitter<any>();
  public mailObjCreated: EventEmitter<any> = new EventEmitter<any>();
  public notifyUsers: EventEmitter<any> = new EventEmitter<any>();
  public updateUserCount: EventEmitter<any> = new EventEmitter<any>();
  public updateDashboard: EventEmitter<any> = new EventEmitter<any>();
  public totalEvents = 0;
  public upcomingEvents = 0;
  public eventGood = 0;
  public eventAverage = 0;
  public eventLow = 0;
  public volunteerGood = 0;
  public volunteerAverage = 0;
  public volunteerLow = 0;
  public top3Locations: any;

  constructor() { }
}
