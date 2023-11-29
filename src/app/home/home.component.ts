import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../shared/http.service';
import { User } from './user.model';
import { HomeService } from './home.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  template: `
  <button (click)="onLogout()">Logout</button>
  <button (click)="reload()">Home</button>
    <table>
      <tr>
        <th align="left">Name</th>
      </tr>
      <tr *ngFor="let file of files">
        <td *ngIf="file.folder"><a (click)="openFolder(file)" [routerLink]="['./']">{{file.name}}</a></td>
        <td *ngIf="!file.folder"><a href="{{file['@microsoft.graph.downloadUrl']}}  "> {{file.name}}</a></td>
         <td *ngIf="!file.folder" (click)="deleteFile(file)" ><button (click)="deleteFile(file)">delete</button></td>
      </tr>
      // <button (click)="uploadFile(file)">Upload</button>
    </table>
  `
})

export class HomeComponent implements OnInit, OnDestroy {
  users: User[];
  files: any[];
  subsGetUsers: Subscription;
  head = {} as any;
  //use to set the token and content type as a header for each request
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${this.httpService.getToken()}`,
    })
  } 
  constructor(
    private homeService: HomeService,
    private authService: AuthService,
    private http:HttpClient,
    private httpService: HttpService
  ) { }

  ngOnInit() {
     this.subsGetUsers = this.homeService.getUsers().subscribe(users => this.users = users);

     this.http.get<any>('https://graph.microsoft.com/v1.0/me/drive/root/children', this.httpOptions).subscribe(res => {
      this.files = res.value;
      console.log(this.files);
     });
  }

  deleteFile(file)
  {

    console.log('deleted');
    this.http.get<any>('https://graph.microsoft.com/v1.0/me/drive', this.httpOptions).subscribe(res => {

      console.log(this.httpOptions);
  
        //here we will use the drive id and access the sub folders
        this.http.delete<any>('https://graph.microsoft.com/v1.0/me/drives/'+ res.id +'/items/'+file.id, this.httpOptions).subscribe(resd => {
          this.files = resd.value;
          console.log(this.files);
  
          // localStorage.setItem('credential','')
         });
       });

  }

// Doesn't work 
  uploadFile(file)
  {
    console.log(file);

    // this.http.get<any>('https://graph.microsoft.com/v1.0/me/drive', this.httpOptions).subscribe(res => {

    //   //here we will use the drive id and access the sub folders
    //   // this.http.put<any>('https://graph.microsoft.com/v1.0/me/drives/'+ res.id +'/items/'+file.id+'/content'
    //   this.http.get<any>('https://graph.microsoft.com/v1.0/me/drives/'+ res.id +'/items/'+ file.id +'/content', this.httpOptions)
    //   // this.http.put<any>('https://graph.microsoft.com/v1.0/me/drives/res.id'+'root:/Home/FileB.txt:/content', this.httpOptions)
    //   // .subscribe(resd => {
    //     // this.files = resd.value;
    //     // console.log(this.files);
    //     // console.log(file.id);
      
    //   //   // localStorage.setItem('credential','')
    //   //  });

    //         // this.http.put<any>('https://graph.microsoft.com/v1.0/me/drives/'+ res.id + 'ABC.txt' + '/content')


    //  });

    // // this.http.put<any>('https://graph.microsoft.com/v1.0/me/drive/root/children/FileB.txt/content',this.httpOptions);

    this.http.get<any>('https://graph.microsoft.com/v1.0/me/drive', this.httpOptions).subscribe(res => {

    console.log(this.httpOptions);

      //here we will use the drive id and access the sub folders
      this.http.put<any>('https://graph.microsoft.com/v1.0/me/drives/'+ res.id +'/items/'+'6E4E8A3E95E74C1E!157'+'/children', this.httpOptions).subscribe(resd => {
        this.files = resd.value;
        console.log(this.files);

        // localStorage.setItem('credential','')
       });
     });

  }
  //this function gets called when someone click on the folder
  openFolder(file) {
    console.log(file);
    //this will goto the main drive and gets the drive id so that we can access the sub folders using that drive id
    this.http.get<any>('https://graph.microsoft.com/v1.0/me/drive', this.httpOptions).subscribe(res => {

      //here we will use the drive id and access the sub folders
      this.http.get<any>('https://graph.microsoft.com/v1.0/me/drives/'+ res.id +'/items/'+file.id+'/children', this.httpOptions).subscribe(resd => {
        this.files = resd.value;
        console.log(this.files);

        // localStorage.setItem('credential','')
       });
       
     });

  }

  reload() {
    this.ngOnInit();
  }

  ngOnDestroy() {
    this.subsGetUsers.unsubscribe();
  }
  //use to log
  onLogout() {
    this.authService.logout();
  }
}
