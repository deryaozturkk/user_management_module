import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiModel } from './models/api.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  api: ApiModel[] = [];
  usernick: string ="";
  userpassword : string= "";
  username:string= "";
  useradmin:string= "";
  updateModel: ApiModel = new ApiModel();
  apiUrl: string = "http://localhost:3007/api/v1"; 

  constructor(private _http: HttpClient) {
    this.users();
  }

  users() {
    this._http.get<ApiModel[]>(this.apiUrl + "/users").subscribe(res => { 
      this.api = res;
    });
  }

  add() {
    let model = {
      "usernick": this.usernick,
      "userpassword": this.userpassword,
      "username": this.username,
      "useradmin": this.useradmin
    };
    this._http.post<any>(this.apiUrl + "/useradd", model).subscribe(res => {
      this.users();
    });
  }
  delete(model:ApiModel){
    this._http.post<any>(this.apiUrl + "/delete", model).subscribe(res => {
      this.users();
    });
  }

  get(model: ApiModel){
    this.updateModel={...model};  
}

update(){
  this._http.post<any>(this.apiUrl + "/update", this.updateModel).subscribe(res => {
  this.users();
  })
}

}
