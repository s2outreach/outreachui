import { Component, OnInit, Inject } from '@angular/core';
import * as _ from 'lodash';
import { OutreachService } from './../../service/outreach.service';

@Component({
  selector: 'app-eventreports',
  templateUrl: './eventreports.component.html',
  styleUrls: ['./eventreports.component.css']
})
export class EventreportsComponent implements OnInit {

  allEvents: any;
  show = true;

  constructor(@Inject(OutreachService) private outreachService) { }

  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents() {
    this.outreachService.getEventReport().subscribe(response => {
      this.allEvents = _.orderBy(response, ['eventdate'], ['desc']);
      for (let i = 0; i < this.allEvents.length; i++) {
        this.allEvents[i].collapse = true;
        this.allEvents[i].id = i;
      }
      this.allEvents[0].collapse = false;
    });
  }

  toggle(index) {
    this.allEvents[index].collapse = !this.allEvents[index].collapse;
    for (let i = 0; i < this.allEvents.length; i++) {
      if ( index != i) {
        this.allEvents[i].collapse = true;
      }
    }
  }

}

