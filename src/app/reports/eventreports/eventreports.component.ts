import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventreports',
  templateUrl: './eventreports.component.html',
  styleUrls: ['./eventreports.component.css']
})
export class EventreportsComponent implements OnInit {

  displayedColumns: string[] = ['username', 'email'];
  dataSource = DATA;

  constructor() { }

  ngOnInit() {
    console.log('im here');
  }

}

export interface VolunteerData {
  username: string;
  email: string;
}

const DATA: VolunteerData[] = [
  { username: 'volunteer1', email: 'email1' },
  { username: 'volunteer2', email: 'email2'},
  { username: 'volunteer3', email: 'email3'},
  { username: 'volunteer4', email: 'email4'},
  { username: 'volunteer5', email: 'email5'},
];
