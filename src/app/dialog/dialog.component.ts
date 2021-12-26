import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../providers/common.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  rowdata: any = []; isApproved: any; message: any;
  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private cs: CommonService, public dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    if (this.data.action == 'approve') {
      this.message = 'Do you want to approve';
    } else this.message = 'Do you want to disapprove';
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

  verifyUser(action: any) {
    let data: any;
    if (this.data.action == 'approve') {
      data = {
        _id: this.data.row._id,
        isVerified: true
      }
    } else {
      data = {
        _id: this.data.row._id,
        isVerified: false
      }
    }
    this.cs.verifyUser(data).subscribe((res: any) => {
      if (res) {
        localStorage.setItem('isApproved', res.isVerified);
        this.dialogRef.close({ isApproved: res.isVerified })
      } else {
        console.log('Error here!')
      }
    })
  }
}
