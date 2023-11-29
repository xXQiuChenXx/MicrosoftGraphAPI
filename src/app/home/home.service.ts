import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { extractData, handleError } from '../shared/http-helper';
import { HttpService } from '../shared/http.service';
import { User } from './user.model';

@Injectable()
export class HomeService {
  url = 'https://graph.microsoft.com/v1.0';
  file = 'demo.xlsx';
  table = 'Table1';

  constructor(
    private http: Http,
    private httpService: HttpService) {
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get(`${this.url}/me/contacts?$select=displayName,emailAddresses`, this.httpService.getAuthRequestOptions())
      .map(extractData)
      .catch(handleError);
  }

}
