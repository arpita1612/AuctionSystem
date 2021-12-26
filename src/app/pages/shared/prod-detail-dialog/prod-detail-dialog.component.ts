import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/providers/common.service';

@Component({
  selector: 'app-prod-detail-dialog',
  templateUrl: './prod-detail-dialog.component.html',
  styleUrls: ['./prod-detail-dialog.component.css']
})
export class ProdDetailDialogComponent implements OnInit {
  prodData: any;
  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private cs: CommonService, public dialogRef: MatDialogRef<ProdDetailDialogComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(JSON.stringify(this.data));
  }

}
