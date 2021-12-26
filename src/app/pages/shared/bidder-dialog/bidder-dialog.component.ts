import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../providers/common.service';

@Component({
  selector: 'app-bidder-dialog',
  templateUrl: './bidder-dialog.component.html',
  styleUrls: ['./bidder-dialog.component.css']
})
export class BidderDialogComponent implements OnInit {
  fgBid: FormGroup; errMsg: any; role: any; key: any; product: any = []; userData: any = [];
  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private cs: CommonService, public dialogRef: MatDialogRef<BidderDialogComponent>, private fb: FormBuilder) {
    this.fgBid = this.fb.group({
      p_id: [this.data._id],
      u_id: [localStorage.getItem('key')],
      name: ['', Validators.required],
      bidAmount: [0, Validators.required],
      comment: [''],
      bidTime: [new Date()]
    });
    this.role = localStorage.getItem('role');
    this.key = localStorage.getItem('key');
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  ngOnInit(): void { }

  getAllProducts() {
    var postdata = { role: this.role, _id: this.key }
    this.cs.getProduct(postdata).subscribe((res: any) => {
      if (res) {
        this.product = res.filter(element => !element.sold);
        console.log(this.product);
      } else {
        this.cs.alert('Error', 'No data found!');
      }
    })
  }
  submit() {
    if (this.fgBid.value.bidAmount < this.userData.bidcoin) {
      if (this.fgBid.value.bidAmount > this.data.productprice && this.fgBid.value.p_id === this.data._id &&  this.data.bid === 0) {
        this.cs.addBid(this.fgBid.value).subscribe((res: any) => {
          if (res) {
            this.errMsg = '';
            this.getAllProducts();
            localStorage.setItem('bidData', JSON.stringify(res));
            this.cs.alert('Error', 'Your bid is added succesfully!');
            window.location.reload();
            this.dialog.closeAll();
          } else {
            this.cs.alert('Error', 'Bid is not added!');
          }
        })
      } else if (this.fgBid.value.bidAmount > this.data.bid && this.fgBid.value.p_id === this.data._id) {

        this.cs.addBid(this.fgBid.value).subscribe((res: any) => {
          if (res) {
            this.errMsg = '';
            this.getAllProducts();
            localStorage.setItem('bidData', JSON.stringify(res));
            this.cs.alert('Error', 'Your bid is added succesfully!');
            window.location.reload();
            this.dialog.closeAll();
          } else {
            this.cs.alert('Error', 'Bid is not added!');
          }
        })
      } else {
        this.cs.alert('Error', 'Your bid amount should be greater than product amount & last bid amout!');
        this.errMsg = 'Your bid amount should be greater than product amount!';
      }
    } else {
      this.cs.alert('Error', 'You have only ' + this.userData.bidcoin + ' bid coins!');
      this.errMsg = 'You have only ' + this.userData.bidcoin + ' bid coins!';
    }
  }

}
