import { Component, Inject, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { SharedService } from './service/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private eventSubscription: Subscription;
  private volunteerRegisteredSubscription: Subscription;
  private newuserSubscription: Subscription;
  private observerUrl = 'http://localhost/observer'
  private stompClient;
  public header = '';
  public username = '';
  public option = '';
  public message = "";

  constructor(@Inject(Router) private router,
  @Inject(SharedService) private sharedService) {
    this.initializeWebSocketConnection();
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd === true) {
        switch (router.url) {
          case ('/login'):
            this.header = 'Login';
            this.username = '';
            this.option = '';
            break;
          case ('/signup'):
            this.header = 'Sign Up';
            this.option = 'Sign in';
            this.username = '';
            break;
          case ('/volunteer'):
            this.header = 'Volunteer';
            this.username = sessionStorage.getItem('username');
            this.option = 'Logout';
            break;
          case ('/admin'):
            this.header = 'Admin';
            this.username = sessionStorage.getItem('username');
            this.option = 'Logout';
            break;
        }
      }
    });
    this.eventSubscription = this.sharedService.eventAdded.subscribe((data: any) => {
      this.message = data;
      this.notifyUsers();
    });
    this.volunteerRegisteredSubscription = this.sharedService.volunteerRegistered.subscribe((data: any) => {
      this.message = data;
      this.notifyUsers();
    });
    this.newuserSubscription = this.sharedService.userAdded.subscribe((data: any) => {
      this.message = data;
      this.notifyUsers();
    });
  }

  ngOnInit() {
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.observerUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe("/notify", (message) => {
        if (message.body) {
          if (message.body == 'userAdded') {
            that.sharedService.updateUserCount.emit('userAdded');
          }
          if (message.body == 'volunteerRegistered') {
            that.sharedService.updateDashboard.emit('volunteerRegistered');
          }
        }
      });
    });
  }

  notifyUsers() {
    this.stompClient.send("/outreach/notifyUsers" , {}, this.message);
  }

  logout() {
    if (this.option === 'Logout') {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('userid');
      this.router.navigate(['/login']);
    }
  }

}
