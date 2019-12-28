import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { OutreachService } from './../../service/outreach.service';
import { SharedService } from './../../service/shared.service';

@Component({
  selector: 'app-allevents',
  templateUrl: './allevents.component.html',
  styleUrls: ['./allevents.component.css']
})
export class AlleventsComponent implements OnInit {

  subscription: Subscription;
  allEvents: any;
  registeredEvents: any;
  unregisteredEvents: any;
  allEventsFormatted: any;

  constructor(@Inject(OutreachService) private outreachService,
    @Inject(SharedService) private sharedService, private _snackBar: MatSnackBar) { 
      this.subscription = this.sharedService.eventAdded.subscribe((data: any) => {
        this.getAllEvents();
      });
    }

  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents() {
    this.outreachService.getAllEvents().subscribe(response => {
      this.allEvents = _.orderBy(response, ['eventdate'], ['desc']);
      this.getRegisteredEvents();
    });
  }

  getRegisteredEvents() {
      this.outreachService.getRegisteredEvents(sessionStorage.getItem('userid')).subscribe(response => {
      this.registeredEvents = _.orderBy(response, ['eventdate'], ['desc']);
      this.registeredEvents = _.intersectionBy(this.allEvents, this.registeredEvents, 'eventid');
      this.sharedService.volunteerRegisteredEvents.emit(this.registeredEvents);
      this.splitEvents();
    });
  }

  splitEvents() {
    this.unregisteredEvents = _.differenceBy(this.allEvents, this.registeredEvents, 'eventid');
    this.registeredEvents.forEach(event => {
      event.registered = true;
    });
    this.unregisteredEvents.forEach(event => {
      event.registered = false;
    });
    this.allEventsFormatted = _.concat(this.registeredEvents, this.unregisteredEvents);
  }

  register(event) {
    const registerObj = {
      eventid: event.eventid,
      userid: sessionStorage.getItem('userid'),
      eventname: event.eventname,
      username: sessionStorage.getItem('username'),
      email: sessionStorage.getItem('email')
    }

    this.outreachService.registerUser(registerObj).subscribe(response => {
      this.getRegisteredEvents();
      this.sharedService.volunteerRegistered.emit('volunteerRegistered');
      this._snackBar.open('Registered successfully!', '', {
        duration: 5000
      });
    });
  }

}
