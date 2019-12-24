import { Component, OnInit, Inject } from '@angular/core';
import { OutreachService } from './../../service/outreach.service';

@Component({
  selector: 'app-volunteerreports',
  templateUrl: './volunteerreports.component.html',
  styleUrls: ['./volunteerreports.component.css']
})
export class VolunteerreportsComponent implements OnInit {

  allVolunteers: any;
  show = true;

  constructor(@Inject(OutreachService) private outreachService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.outreachService.getUserReport().subscribe(response => {
      this.allVolunteers = response;
      for (let i = 0; i < this.allVolunteers.length; i++) {
        this.allVolunteers[i].collapse = true;
        this.allVolunteers[i].id = i;
      }
      this.allVolunteers[0].collapse = false;
    });
  }

  toggle(index) {
    this.allVolunteers[index].collapse = !this.allVolunteers[index].collapse;
    for (let i = 0; i < this.allVolunteers.length; i++) {
      if ( index != i) {
        this.allVolunteers[i].collapse = true;
      }
    }
  }
}

