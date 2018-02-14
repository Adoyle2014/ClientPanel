import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ClientsComponent } from './components/clients/clients.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppRoutingModule } from './/app-routing.module';

import { ClientService } from "./services/client.service";
import { AuthService } from "./services/auth.service";
import { SettingsService } from "./services/settings.service";

import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from "angular2-flash-messages";


@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        FormsModule,
        FlashMessagesModule.forRoot()
  ],
    providers: [ClientService, AuthService, SettingsService ],
  declarations: [
      AppComponent,
      DashboardComponent,
      LoginComponent,
      RegisterComponent,
      AddClientComponent,
      EditClientComponent,
      SettingsComponent,
      NotFoundComponent,
      ClientDetailsComponent,
      ClientsComponent,
      NavbarComponent,
      SidebarComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
