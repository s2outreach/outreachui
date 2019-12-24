import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { OutreachService } from '../service/outreach.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';
  public errorMsg = '';

  constructor(@Inject(OutreachService) private outreachService, @Inject(Router) private router) { }

  ngOnInit() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userid');
  }

  mocksignin() {
    this.router.navigate(['/volunteer']);
  }
  signin() {
    this.errorMsg = '';
    if (this.username === '' || this.password === '') {
      this.errorMsg = 'Invalid login';
    } else {
      this.outreachService.authenticate(this.username, this.password).subscribe(response => {
        sessionStorage.setItem('username', this.username);
        sessionStorage.setItem('role', response.body.role);
        sessionStorage.setItem('userid', response.body.userid);
        sessionStorage.setItem('token', response.headers.get('Authorization'));
        console.log(response.body.role);
        if (response.body.role === 'USER') {
          this.router.navigate(['/volunteer']);
        }
        if (response.body.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        }
    }, error => {
      if (error.status === 401) {
        this.errorMsg = 'Invalid credentials';
      } else {
        this.errorMsg = 'Server unavailable';
      }
    });
    }
  }
}
