import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { User } from 'src/app/models/user';
import { CommonService } from 'src/app/providers/common.service';

@Component({
  selector: 'app-auctioner',
  templateUrl: './auctioner.component.html',
  styleUrls: ['./auctioner.component.css']
})
export class AuctionerComponent implements OnInit {
  userData: User[] = []; toggle = true;
  status = 'Enable';
  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'mobileNumber', 'DOB', 'address', 'action'];
  dataSource: MatTableDataSource<User>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isApproved: any = false;


  constructor(private cs: CommonService, private dialog: MatDialog,) {
  }

  ngOnInit() {
    this.getAuctionerList();
    // this.dropTable();
  }
  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }

  getAuctionerList() {
    var role = "auctioner";
    this.cs.getList(role).subscribe((res: any) => {
      if (res.length !== 0) {
        this.userData = res;
        this.dataSource = new MatTableDataSource(this.userData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(`UserData : ${res}`);
        localStorage.setItem('auctionCount', JSON.stringify(this.userData.length));
      }
      else {
        this.cs.alert('Error', 'No data found!');
      }
    })
  }

  dropTable() {
    // this.cs.drop('product1').subscribe((res: any) => {
    //   console.log(res);
    // });
  }

  opendialog(row: any, action: any): void {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "40%";
    var dialogref = this.dialog.open(DialogComponent, {
      data: ({ row: row, action: action, parent: this })
    })
    dialogref.afterClosed().subscribe((result: any) => {
      this.isApproved = result;
      this.getAuctionerList();
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
