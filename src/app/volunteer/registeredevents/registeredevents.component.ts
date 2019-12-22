import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registeredevents',
  templateUrl: './registeredevents.component.html',
  styleUrls: ['./registeredevents.component.css']
})
export class RegisteredeventsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cancel() {
    console.log('cancelled');
  }

}
