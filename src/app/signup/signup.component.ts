import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OutreachService } from '../service/outreach.service';
import { SharedService } from './../service/shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public driverChecked = false;
  public riderChecked = false;
  public firstCheck = true;
  public username = '';
  public email = '';
  public password = '';
  public confirmPassword = '';
  public errorMsg = '';
  public successMsg = '';

  constructor(@Inject(OutreachService) private outreachService,
    @Inject(SharedService) private sharedService,
    @Inject(Router) private router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  submit() {
    let role = '';
    this.errorMsg = '';
    if (this.confirmPassword === '') {
      this.errorMsg = 'Password do not match';
    }
    if (this.password === '') {
      this.errorMsg = 'Password cannot be blank';
    }
    if (this.email === '') {
      this.errorMsg = 'Email cannot be blank';
    }
    if (this.username === '') {
      this.errorMsg = 'User Name cannot be blank';
    }

    if (this.errorMsg.length == 0) {
      const reqObj = {
        username: this.username,
        password: this.password,
        email: this.email
      };
      this.outreachService.register(reqObj).subscribe(response => {
        if (response.status && response.status == 'Service unavailable') {
          this.errorMsg = 'Server unavailable';
        }
        if (response.status == 'user added') {
          this.sharedService.userAdded.emit('userAdded');
          this._snackBar.open('Sign up Complete. Please login', '', {
            duration: 5000
          });
          this.router.navigate(['/login']);
        }
        if (response.status == 'username exists') {
          this.errorMsg = 'Username already exists';
        }
        if (response.status == 'email exists') {
          this.errorMsg = 'Email already exists';
        }
      },
        error => {
          this.errorMsg = 'Server unavailable';
        });
    }
  }

}
