import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { OutreachService } from './../../service/outreach.service';
import { SharedService } from './../../service/shared.service';

@Component({
  selector: 'app-volunteerreports',
  templateUrl: './volunteerreports.component.html',
  styleUrls: ['./volunteerreports.component.css']
})
export class VolunteerreportsComponent implements OnInit {

  subscription: Subscription;
  allVolunteers: any;
  show = true;
  volunteerGood = 0;
  volunteerAverage = 0;
  volunteerLow = 0;

  constructor(@Inject(OutreachService) private outreachService,
    @Inject(SharedService) private sharedService) { 
      this.subscription = this.sharedService.eventAdded.subscribe((data: any) => {
        this.getAllUsers();
      });
    }

  ngOnInit() {
    this.allVolunteers = [];
    this.getAllUsers();
  }

  getAllUsers() {
    this.outreachService.getUserReport().subscribe(response => {
      if (response.length > 0) {
        this.allVolunteers = response;
        for (let i = 0; i < this.allVolunteers.length; i++) {
          this.allVolunteers[i].collapse = true;
          this.allVolunteers[i].id = i;
        }
        this.allVolunteers[0].collapse = false;
      }
    });
  }

  toggle(index) {
    this.allVolunteers[index].collapse = !this.allVolunteers[index].collapse;
    for (let i = 0; i < this.allVolunteers.length; i++) {
      if (index != i) {
        this.allVolunteers[i].collapse = true;
      }
    }
  }

  eventByParticipation() {
    let tempGroupedUsers: any;
    let groupedUsers = [];
    tempGroupedUsers = _.groupBy(this.allVolunteers, 'userid');
    _.each(
      _.sortBy(
        _.toArray(tempGroupedUsers), function (num) {
          return num;
        }
      ).reverse(), function (v) {
        groupedUsers.push(v);
      }
    );
    groupedUsers.forEach((user: any) => {
      if (user[0].eventdata) {
        const numOfEvents = user[0].eventdata.length;
        if (numOfEvents >= 10) {
          this.volunteerGood = this.volunteerGood + 1;
        } else if (numOfEvents > 5) {
          this.volunteerAverage = this.volunteerAverage + 1;
        } else {
          this.volunteerLow = this.volunteerLow + 1;
        }
      }
    });
  }

  sendtoDashboard() {
    this.sharedService.volunteerGood = this.volunteerGood;
    this.sharedService.volunteerAverage = this.volunteerAverage;
    this.sharedService.volunteerLow = this.volunteerLow;
    this.sharedService.voluteerReportToDashboard.emit('dashboardData');
  }
}

