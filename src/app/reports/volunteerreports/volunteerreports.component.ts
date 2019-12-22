import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-volunteerreports',
  templateUrl: './volunteerreports.component.html',
  styleUrls: ['./volunteerreports.component.css']
})
export class VolunteerreportsComponent implements OnInit {

  displayedColumns: string[] = ['eventname', 'date'];
  dataSource = DATA;

  constructor() { }

  ngOnInit() {
  }

}

export interface EventData {
  username: string;
  email: string;
}

const DATA: EventData[] = [
  { eventname: 'event1', date: 'date1' },
  { eventname: 'event2', date: 'date2'},
  { eventname: 'event3', date: 'date3'},
  { eventname: 'event4', date: 'date4'},
  { eventname: 'event5', date: 'date5'},
];