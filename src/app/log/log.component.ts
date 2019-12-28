import { Component, OnInit, Inject } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { OutreachService } from './../service/outreach.service';
import { SharedService } from './../service/shared.service'

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  logs: any;
  eventSubscription: Subscription;
  userSubscription: Subscription;
  volunteerRegisteredSubscription: Subscription;

  constructor(@Inject(OutreachService) private outreachService,
  @Inject(SharedService) private sharedService) { 
    this.eventSubscription = this.sharedService.eventAdded.subscribe((data: any) => {
      this.getLog();
    });
    this.userSubscription = this.sharedService.updateUserCount.subscribe((data: any) => {
      this.getLog();
    });
    this.volunteerRegisteredSubscription = this.sharedService.updateDashboard.subscribe((data: any) => {
      this.getLog();
    });
  }

  ngOnInit() {
    this.getLog();
  }

  getLog() {
    this.outreachService.getLog().subscribe(response => {
      this.logs = [];
      response = _.orderBy(response, ['timestamp'], ['desc']);
      response.forEach(eachLog => {
        this.logs.push(eachLog.eventname + ' | '
        + eachLog.username + ' | '
        + eachLog.action + ' | '
        + eachLog.timestamp);
      });
    });
  }

}
