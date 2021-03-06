import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { OutreachService } from './../service/outreach.service';
import { SharedService } from './../service/shared.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  allLocations = ['Bangalore', 'Chennai', 'Cochin', 'Coimbatore', 'Mumbai', 'Kolkata'];
  eventname = '';
  eventdate = '';
  location = '';
  newEventflag = false;
  errorMsg = '';
  allEvents: any;
  totalEvents = 0;
  upcomingCount = 0;
  currDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  sendmailChecked = true;
  formatteddate = '';
  reqObj: any;

  dateFilter = (d: Date): boolean => {
    const day = this.datePipe.transform(d, 'yyyy-MM-dd');
    return (this.currDate < day);
  }

  constructor(@Inject(OutreachService) private outreachService,
  @Inject(SharedService) private sharedService,
  private datePipe : DatePipe, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllEvents();
  }

  addEvent() {
    this.newEventflag = true;
  }

  save() {
    this.formatteddate = this.datePipe.transform(this.eventdate, 'yyyy-MM-dd');
    this.errorMsg = '';
    if (this.location === '' || this.eventname === '' || this.eventdate === '') {
      this.errorMsg = 'All fields mandatory';
    } else {
      this.reqObj = {
        eventname: this.eventname,
        eventdate: this.formatteddate,
        location: this.location
      };
      this.outreachService.addEvent(this.reqObj).subscribe(response => {
        this.newEventflag = false;
        this.sharedService.eventAdded.emit('eventAdded');
        this.getAllEvents();
        if (this.sendmailChecked) {
          this.sendmail();
          this._snackBar.open('New Event added!', '', {
            duration: 5000
          });
        } else {
          this._snackBar.open('New Event added and mail sent!', '', {
            duration: 5000
          });
        }
      });
    }
  }

  sendmail() {
    this.outreachService.sendNewEventMail(this.reqObj).subscribe(response => {
    });
  }

  getAllEvents() {
    this.outreachService.getAllEvents().subscribe(response => {
      this.allEvents = _.orderBy(response, ['eventdate'], ['desc']);
      this.eventdate = '';
      this.eventname = '';
      this.location = '';
      this.eventInsight();
    });
  }

  eventInsight() {
    this.totalEvents = this.allEvents.length;
    const that = this;
    const upcompingEvents = _.filter(this.allEvents, function(event) {
      return (event.eventdate > that.currDate );
    });
    this.upcomingCount = upcompingEvents.length;
    this.sendtoDashboard();
  }

  sendtoDashboard() {
    this.sharedService.totalEvents = this.totalEvents;
    this.sharedService.upcomingCount = this.upcomingCount;
    this.sharedService.eventToDashboard.emit('dashboardData');
  }

  cancel() {
    this.newEventflag = false;
  }
}
