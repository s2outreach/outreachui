import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
import { OutreachService } from './../service/outreach.service';
import { SharedService } from './../service/shared.service'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  eventname = '';
  eventdate = '';
  location = '';
  newEventflag = false;
  errorMsg = '';
  allEvents: any;

  dateFilter = (d: Date): boolean => {
    const currDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const day = this.datePipe.transform(d, 'yyyy-MM-dd');
    return (currDate < day);
  }

  constructor(@Inject(OutreachService) private outreachService,
  @Inject(SharedService) private sharedService,
  private datePipe : DatePipe) { }

  ngOnInit() {
    this.getAllEvents();
  }

  addEvent() {
    this.newEventflag = true;
  }

  save() {
    const formatteddate = this.datePipe.transform(this.eventdate, 'yyyy-MM-dd');
    this.errorMsg = '';
    if (this.location === '' || this.eventname === '' || this.eventdate === '') {
      this.errorMsg = 'All fields mandatory';
    } else {
      const reqObj = {
        eventname: this.eventname,
        eventdate: formatteddate,
        location: this.location
      };
      this.outreachService.addEvent(reqObj).subscribe(response => {
        this.newEventflag = false;
        this.sharedService.updateLog.emit('updateLog');
        this.getAllEvents();
      });
    }
  }

  getAllEvents() {
    this.outreachService.getAllEvents().subscribe(response => {
      this.allEvents = _.orderBy(response, ['eventdate'], ['desc']);
      this.eventdate = '';
      this.eventname = '';
      this.location = '';
    });
  }

  cancel() {
    this.newEventflag = false;
  }
}
