import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/providers/common.service';

@Component({
  selector: 'app-biddar-front',
  templateUrl: './biddar-front.component.html',
  styleUrls: ['./biddar-front.component.css']
})
export class BiddarFrontComponent implements OnInit {
  opened = true; over = 'side'; expandHeight = '42px'; collapseHeight = '42px';
  displayMode = 'flat'; state: string = 'default'; watcher: Subscription;
  showadmin: boolean = false;
  role: any; key: any; product: any = []; userData: any = [];
  editBidder: FormGroup; hide = true; showForm: boolean = false;
  constructor(private cs: CommonService, private fb: FormBuilder, media: MediaObserver) {
    this.watcher = media.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false;
        this.over = 'over';
      } else {
        this.opened = true;
        this.over = 'side';
      }
    });
    this.editBidder = this.fb.group({
      _id: [localStorage.getItem('key')],
      name: [''],
      email: [''],
      gender: [''],
      DOB: [''],
      mobileNumber: [''],
      address: [''],
      isVerified: ['false'],
      role: [''],
      username: [''],
      // password: ['123456']
    });
    this.role = localStorage.getItem('role');
    this.key = localStorage.getItem('key');
  }

  ngOnInit(): void {
    this.getAllProducts();
    if (localStorage.getItem('userData') !== null) {
      this.userData = JSON.parse(localStorage.getItem('userData'))
    }
  }

  getMyProducts() {
    this.showForm = false;
    var postdata = { role: this.role, _id: this.key, myProduct: 'myProduct' }
    this.cs.getProduct(postdata).subscribe((res: any) => {
      if (res) {
        this.product = res;
      } else {
        this.cs.alert('Error', 'No data found!');
      }
    })
  }

  getAllProducts() {
    this.showForm = false;
    var postdata = { role: this.role, _id: this.key }
    this.cs.getProduct(postdata).subscribe((res: any) => {
      if (res) {
        this.product = res.filter(element => !element.sold);
        // if (localStorage.getItem('role') == 'auctioner') {
        //   localStorage.setItem('comeFrom', 'auctioner');
        // }
      } else {
        this.cs.alert('Error', 'No data found!');
      }
    })
  }
  onUpdate() {
    this.cs.updateUser(this.editBidder.value).subscribe((res: any) => {
      if (res) {
        this.cs.alert('Success', 'User update succesfully!');
        this.showForm = false;
        this.userData = res.data;
        localStorage.setItem('userData', JSON.stringify(res.data));
      } else {
        this.cs.alert('Error', 'Something went wrong!');
      }
    })
  }

  logout() {
    this.cs.logout();
  }

  editUser() {
    this.showForm = true;
    if (localStorage.getItem('userData') !== null) {
      this.userData = JSON.parse(localStorage.getItem('userData'));
      this.editBidder = this.fb.group({
        _id: [localStorage.getItem('key')],
        name: [this.userData.name],
        email: [this.userData.email],
        gender: [this.userData.gender],
        DOB: [this.userData.DOB],
        mobileNumber: [this.userData.mobileNumber],
        address: [this.userData.address],
        isVerified: [false],
        role: [this.userData.role],
        username: [this.userData.username],
        // password: ['123456']
      });
    }
  }
}
