import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { HttpService } from './shared/http.service';
import { AuthService } from './auth/auth.service';
import { HomeService } from './home/home.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    HttpService,
    AuthService,
    HomeService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
