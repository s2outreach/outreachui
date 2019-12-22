import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  eventname: any;
  eventdate: any;
  reqdCount: any;
  newEventflag = false;

  constructor() { }

  ngOnInit() {
  }

  addEvent() {
    this.newEventflag = true;
    console.log('clicked');
    console.log(this.eventdate);
    console.log(this.eventname);
    console.log(this.reqdCount);
  }

  save() {
    this.newEventflag = false;
  }

  cancel() {
    this.newEventflag = false;
  }
}
