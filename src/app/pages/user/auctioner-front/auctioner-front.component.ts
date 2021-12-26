import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/providers/common.service';

@Component({
  selector: 'app-auctioner-front',
  templateUrl: './auctioner-front.component.html',
  styleUrls: ['./auctioner-front.component.css']
})
export class AuctionerFrontComponent implements OnInit {
  fgAddProduct: FormGroup; showForm: boolean = false; userData: any; editForm = false;
  private base64textString: String = ""; role: any; key: any; product: any = [];
  editAuctioner: FormGroup;
  opened = true; over = 'side'; expandHeight = '42px'; collapseHeight = '42px';
  displayMode = 'flat'; state: string = 'default'; watcher: Subscription;

  constructor(private fb: FormBuilder, private cs: CommonService, private router: Router, media: MediaObserver) {
    const id = localStorage.getItem('userData');

    this.watcher = media.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false;
        this.over = 'over';
      } else {
        this.opened = true;
        this.over = 'side';
      }
    });
    this.fgAddProduct = this.fb.group({
      Auctioner_Id: [localStorage.getItem('key')],
      productname: ['', Validators.required],
      image: ['', Validators.required],
      producttype: ['', Validators.required],
      productdiscription: ['', Validators.required],
      productprice: [250, Validators.required],
    });

    this.editAuctioner = this.fb.group({
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
      // password: ['']
    });

    this.role = localStorage.getItem('role');
    this.key = localStorage.getItem('key');
  }

  ngOnInit(): void {
    this.getProduct();
    if (localStorage.getItem('userData') !== null) {
      this.userData = JSON.parse(localStorage.getItem('userData'))
    }
  }
  getProduct() {
    var postdata = { role: this.role, _id: this.key }
    this.cs.getProduct(postdata).subscribe((res: any) => {
      if (res) {
        this.product = res.filter(element => !element.sold);
        if (localStorage.getItem('role') == 'auctioner') {
          localStorage.setItem('comeFrom', 'auctioner');
        }
      } else {
        this.cs.alert('Error', 'No data found!');
      }
    })
  }

  handleFileSelect(evt: any) {
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.fgAddProduct.controls['image'].setValue(this.base64textString);
  }

  addProduct() { this.showForm = true; this.editForm = false; }
  showProducts() { this.showForm = false; this.editForm = false; }

  onSubmit() {
  
    this.cs.addProduct(this.fgAddProduct.value).subscribe((res: any) => {
      if (res) {
        this.cs.alert('Success', 'Product added succesfully!');
        this.fgAddProduct.reset();
        this.getProduct();
        this.showForm = false; this.editForm = false;
      } else {
        this.cs.alert('Error', 'Product added succesfully!');
      }
    })
  }
  updateValues() {
    this.fgAddProduct = this.fb.group({
      productname: [''],
      image: [''],
      producttype: [''],
      productdiscription: [''],
      productprice: [''],
    });

  }
  logout() {
    this.cs.logout();
  }

  editUser() {
    this.showForm = false; this.editForm = true;
    if (localStorage.getItem('userData') !== null) {
      this.userData = JSON.parse(localStorage.getItem('userData'));
      this.editAuctioner = this.fb.group({
        _id: [localStorage.getItem('key')],
        name: [this.userData.name],
        email: [this.userData.email],
        gender: [this.userData.gender],
        DOB: [this.userData.DOB],
        mobileNumber: [this.userData.mobileNumber],
        address: [this.userData.address],
        isVerified: [this.userData.isVerified],
        role: [this.userData.role],
        username: [this.userData.username],
        // password: [this.userData.password]
      });
    }
  }
  onUpdate() {
    this.showForm = false; this.editForm = false;
    this.cs.updateUser(this.editAuctioner.value).subscribe((res: any) => {
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
}
