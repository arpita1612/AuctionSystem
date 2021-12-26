import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public http: HttpClient, private router: Router, private _snackBar: MatSnackBar) { }

  loginUser(data: any) {
    return this.http.post(environment.ApiUrl + 'users/login', data);
  }
  registerUser(data: any) {
    return this.http.post(environment.ApiUrl + 'users/register', data);
  }
  updateUser(data: any) {
    return this.http.post(environment.ApiUrl + 'users/update', data);
  }
  addProduct(data: any) {
    return this.http.post(environment.ApiUrl + 'product/addProduct', data);
  }
  getList(role: any): Observable<User[]> {
    return this.http.post<User[]>(environment.ApiUrl + 'admin/list', { role: role });
  }
  verifyUser(data: any) {
    return this.http.post(environment.ApiUrl + 'users/update', data);
  }
  getProduct(data: any) {
    return this.http.post(environment.ApiUrl + 'product/listProduct', data);
  }
  addBid(data: any) {
    return this.http.post(environment.ApiUrl + 'bid/bid', data);
  }
  updateBid(data: any) {
    return this.http.post(environment.ApiUrl + 'bid/bidUpdate', data);
  }
  removeBid(data: any) {
    return this.http.post(environment.ApiUrl + 'bid/bidRemove', data);
  }

  getBidList() {
    let data = {}
    return this.http.post(environment.ApiUrl + 'bid/bidListByDate', data);
  }

  getAllBids() {
    return this.http.post(environment.ApiUrl + 'bid/getBids', {});
  }

  // drop(data: any) {
  //   return this.http.post(environment.ApiUrl + 'admin/tableDrop', { tableName: data });
  // }

  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('key');
    localStorage.removeItem('userData');
    localStorage.removeItem('comeFrom');
    localStorage.removeItem('bidData');
    this.router.navigate(['/login']);
  }

  alert(type: string, messege: string, action?: string, timeout?: number) {
    action = action == null ? 'Ok' : action;
    timeout = timeout == null ? 5000 : timeout;

    this._snackBar.open(messege, action, {
      duration: timeout,
    });
  }
}
