import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OutreachService } from './../service/outreach.service';
import { SharedService } from './../service/shared.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  mailobjSubscription: Subscription;
  mailobj: any;

  constructor(@Inject(OutreachService) private outreachService, 
  @Inject(SharedService) private sharedService, private _snackBar: MatSnackBar ) {
    this.mailobjSubscription = this.sharedService.mailObjCreated.subscribe((mailobj) => {
      this.mailobj = mailobj;
    })
   }

  ngOnInit() {
  }

  sendmail() {
    this._snackBar.open('Mail Sent to the Admin inbox!', '', {
      duration: 5000
    });
    this.outreachService.sendReportMail(this.mailobj).subscribe(response => {
    });
  }
}
