import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { OutreachService } from '../service/outreach.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  encapsulation: ViewEncapsulation.None;

  allRides: any;
  interval: any;

  constructor(@Inject(OutreachService) private outreachService) { }

  ngOnInit() {

   }

}
