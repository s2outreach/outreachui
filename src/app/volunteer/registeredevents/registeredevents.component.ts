import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { OutreachService } from './../../service/outreach.service';
import { SharedService } from './../../service/shared.service';

@Component({
  selector: 'app-registeredevents',
  templateUrl: './registeredevents.component.html',
  styleUrls: ['./registeredevents.component.css']
})
export class RegisteredeventsComponent implements OnInit {

  volunteerRegisteredEventsSubscription: Subscription;
  registeredEvents: any;
  allEvents: any;

  constructor(@Inject(OutreachService) private outreachService,
  @Inject(SharedService) private sharedService) { 
    this.volunteerRegisteredEventsSubscription = this.sharedService.volunteerRegisteredEvents.subscribe((registeredEvents: any) => {
      this.registeredEvents = registeredEvents;
    });
  }

  ngOnInit() {
  }
  
}
