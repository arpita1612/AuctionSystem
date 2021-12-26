import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/providers/common.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  role: any;
  key: any
  product: any = [];
  constructor(private cs: CommonService) {
    this.role = localStorage.getItem('role');
    this.key = localStorage.getItem('key');
  }

  ngOnInit(): void {
    var postdata = { role: this.role, _id: this.key }
    this.cs.getProduct(postdata).subscribe((res: any) => {
      if (res) {
        this.product = res.filter(element => !element.sold);
        if (localStorage.getItem('role') == 'admin') {
          localStorage.setItem('comeFrom', 'admin');
        }
      } else {
        this.cs.alert('Error', 'No data found!');
      }
    })
  }

}
