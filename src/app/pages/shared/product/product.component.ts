import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BidderDialogComponent } from '../bidder-dialog/bidder-dialog.component';
import { ProdDetailDialogComponent } from '../prod-detail-dialog/prod-detail-dialog.component';

@Component({
  selector: 'app-shared-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class SharedProductComponent implements OnInit {
  @Input() product: any; showChip: string = ''; @Input() role: any;
  visible = true;
  selectable = true;
  removable = true; bidData: any;
 
  constructor(private dialog: MatDialog, private router: Router) {
    if (localStorage.getItem('bidData') !== null) {
      this.bidData = JSON.parse(localStorage.getItem('bidData'));
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('comeFrom') == 'admin') {
      this.showChip = 'admin';
    } else if (localStorage.getItem('comeFrom') == 'auctioner') {
      this.showChip = 'auctioner';
    } else {
      this.showChip = 'bidder';
    }
  }
  opendialog(data: any): void {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.autoFocus = true;
    var dialogref = this.dialog.open(BidderDialogComponent, {
      data: (data),
      height: '45%',
      width: '50%'
    })
    // dialogref.afterClosed().subscribe((result: any) => {
    //     this.isApproved = result;
    //     this.getAuctionerList();
    //   })
  }


  onLogin() {
    this.router.navigateByUrl('/login');
  }

  showdetail(data: any) {
    if (this.bidData) {
      console.log(this.bidData);
      data.bid = this.bidData.data.bidAmount;
    }
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.autoFocus = true;
    var dialogref = this.dialog.open(ProdDetailDialogComponent, {
      data: (data),
      height: '50%',
      width: '55%'
    })
  }
  
}
