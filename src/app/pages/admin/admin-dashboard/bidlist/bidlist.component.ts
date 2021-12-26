import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { CommonService } from 'src/app/providers/common.service';

@Component({
  selector: 'app-bidlist',
  templateUrl: './bidlist.component.html',
  styleUrls: ['./bidlist.component.css']
})
export class BidlistComponent implements OnInit {
  bidData: any = [];
  status = 'Enable';
  displayedColumns: string[] = ['id', 'name', 'productname', 'bidAmount', 'bidTime'];
  dataSource: MatTableDataSource<User>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cs: CommonService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.cs.getAllBids().subscribe((res: any) => {
      if (res.length !== 0) {
        this.bidData = res;
        this.dataSource = new MatTableDataSource(this.bidData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.cs.alert('Error', 'No data found!');
      }
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
