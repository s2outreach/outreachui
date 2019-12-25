import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { OutreachService } from './../../service/outreach.service';
import { SharedService } from './../../service/shared.service';

@Component({
  selector: 'app-eventreports',
  templateUrl: './eventreports.component.html',
  styleUrls: ['./eventreports.component.css']
})
export class EventreportsComponent implements OnInit {

  subscription: Subscription;
  allEvents: any;
  show = true;
  eventGood = 0;
  eventAverage = 0;
  eventLow = 0;
  top3Locations: any;

  constructor(@Inject(OutreachService) private outreachService,
    @Inject(SharedService) private sharedService) { 
      this.subscription = this.sharedService.eventAdded.subscribe((data: any) => {
        this.getAllEvents();
      });
    }

  ngOnInit() {
    this.allEvents = [];
    this.getAllEvents();
  }

  getAllEvents() {
    this.outreachService.getEventReport().subscribe(response => {
      this.allEvents = [];
      if (response.length > 0) {
        this.allEvents = _.orderBy(response, ['eventdate'], ['desc']);
        this.eventByParticipation();
        this.eventByLocation();
        this.sendtoDashboard();
        for (let i = 0; i < this.allEvents.length; i++) {
          this.allEvents[i].collapse = true;
          this.allEvents[i].id = i;
        }
        this.allEvents[0].collapse = false;
      }
    });
  }

  toggle(index) {
    this.allEvents[index].collapse = !this.allEvents[index].collapse;
    for (let i = 0; i < this.allEvents.length; i++) {
      if (index != i) {
        this.allEvents[i].collapse = true;
      }
    }
  }

  eventByParticipation() {
    let tempGroupedEvents: any;
    let groupedEvents = [];
    tempGroupedEvents = _.groupBy(this.allEvents, 'eventid');
    _.each(
      _.sortBy(
        _.toArray(tempGroupedEvents), function (num) {
          return num;
        }
      ).reverse(), function (v) {
        groupedEvents.push(v);
      }
    );
    groupedEvents.forEach((event: any) => {
      if (event[0].userdata) {
        const numOfUsers = event[0].userdata.length;
        if (numOfUsers >= 20) {
          this.eventGood = this.eventGood + 1;
        } else if (numOfUsers > 10) {
          this.eventAverage = this.eventAverage + 1;
        } else {
          this.eventLow = this.eventLow + 1;
        }
        console.log(this.eventGood);
        console.log(this.eventAverage);
        console.log(this.eventLow);
      }
    });
  }

  eventByLocation() {
    let groupedEvents: any;
    let locationCount = [];
    groupedEvents = _.groupBy(this.allEvents, 'eventlocation');
    const eventsByLocation = _.toArray(groupedEvents);
    eventsByLocation.forEach((location: any) => {
      const count = {
        'eventlocation': location[0].eventlocation,
        'locationcount': location.length
      }
      locationCount.push(count);
    })
    const sortedLocation = _.orderBy(locationCount, ['locationcount'], ['desc']);
    this.top3Locations = _.slice(sortedLocation, 0, 3);
  }

  sendtoDashboard() {
    this.sharedService.eventGood = this.eventGood;
    this.sharedService.eventAverage = this.eventAverage;
    this.sharedService.eventLow = this.eventLow;
    this.sharedService.top3Locations = this.top3Locations;
    this.sharedService.eventReportToDashboard.emit('dashboardData');
  }

}

