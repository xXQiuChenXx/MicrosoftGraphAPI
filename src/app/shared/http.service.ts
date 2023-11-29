import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import * as hello from 'hellojs/dist/hello.all.js';

@Injectable()
export class HttpService {
  //this is the data you'll receive after you successfully logged in
  getAuthRequestOptions() {
    const msft = hello('msft').getAuthResponse();
    const authHeaders = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + msft.access_token });
    //this is used to set the token to local storage
    localStorage.setItem('angularOneDriveToken', JSON.stringify(msft.access_token));
    return { headers: authHeaders };
  }

  //this is used to get the token from local storage
  public getToken(): string {
    return  JSON.parse(localStorage.getItem('angularOneDriveToken'));
  }
}
