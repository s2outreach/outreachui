import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { OutreachService } from './../service/outreach.service';
import { SharedService } from './../service/shared.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userCount = 0;
  eventSubscription: Subscription;
  eventReportSubscription: Subscription;
  volunterReportSubscription: Subscription;
  public totalEvents = 0;
  public upcomingCount = 0;
  public eventGood = 0;
  public eventAverage = 0;
  public eventLow = 0;
  public top1Location = '';
  public top2Location = '';
  public top3Location = '';
  public top1Count = 0;
  public top2Count = 0;
  public top3Count = 0;
  public volunteerGood = 0;
  public volunteerAverage = 0;
  public volunteerLow = 0;

  constructor(@Inject(OutreachService) private outreachService,
    @Inject(SharedService) private sharedService) {
    this.eventSubscription = this.sharedService.eventToDashboard.subscribe((data: any) => {
      this.totalEvents = this.sharedService.totalEvents;
      this.upcomingCount = this.sharedService.upcomingCount;
      console.log('this.totalEvents', this.totalEvents);
      console.log('this.upcomingCount', this.upcomingCount);
    });

    this.eventReportSubscription = this.sharedService.eventReportToDashboard.subscribe((data: any) => {
      this.eventGood = this.sharedService.eventGood;
      this.eventAverage = this.sharedService.eventAverage;
      this.eventLow = this.sharedService.eventLow;
      if (this.sharedService.top3Locations[0]) {
        this.top1Location = this.sharedService.top3Locations[0].eventlocation;
        this.top1Count = this.sharedService.top3Locations[0].locationcount;
      }
      if (this.sharedService.top3Locations[1]) {
        this.top2Location = this.sharedService.top3Locations[1].eventlocation;
        this.top2Count = this.sharedService.top3Locations[1].locationcount;
      }
      if (this.sharedService.top3Locations[2]) {
        this.top3Location = this.sharedService.top3Locations[2].eventlocation;
        this.top3Count = this.sharedService.top3Locations[2].locationcount;
      }
      console.log('this.eventGood', this.eventGood);
      console.log('this.eventAverage', this.eventAverage);
      console.log('this.eventLow', this.eventLow);
      console.log('this.top3Locations', this.sharedService.top3Locations[0]);

    });

    this.volunterReportSubscription = this.sharedService.voluteerReportToDashboard.subscribe((data: any) => {
      this.volunteerGood = this.sharedService.volunteerGood;
      this.volunteerAverage = this.sharedService.volunteerAverage;
      this.volunteerLow = this.sharedService.volunteerLow;
      console.log('this.volunteerGood', this.volunteerGood);
      console.log('this.volunteerAverage', this.volunteerAverage);
      console.log('this.volunteerLow', this.volunteerLow);
    });


  }

  ngOnInit() {
    this.getUserCount();
  }

  getUserCount() {
    this.outreachService.getUserCount().subscribe(response => {
      this.userCount = response.count;
    });
  }

}
