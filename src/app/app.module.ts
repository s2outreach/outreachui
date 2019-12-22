import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule, MatTooltipModule, MatIconModule, MatInputModule, MatFormFieldModule, MatDividerModule,
  MatCardModule, MatSnackBarModule, MatRadioModule, MatChipsModule, MatTabsModule,
  MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatTableModule, MatExpansionModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { HttpinterceptorService } from './service/httpinterceptor.service';
import { EventsComponent } from './events/events.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { LogComponent } from './log/log.component';
import { EventreportsComponent } from './reports/eventreports/eventreports.component';
import { VolunteerreportsComponent } from './reports/volunteerreports/volunteerreports.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { AlleventsComponent } from './volunteer/allevents/allevents.component';
import { RegisteredeventsComponent } from './volunteer/registeredevents/registeredevents.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    EventsComponent,
    DashboardComponent,
    ReportsComponent,
    LogComponent,
    EventreportsComponent,
    VolunteerreportsComponent,
    VolunteerComponent,
    AlleventsComponent,
    RegisteredeventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'}),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatCardModule,
    MatRadioModule,
    MatChipsModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTableModule,
    MatExpansionModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
