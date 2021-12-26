import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../providers/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  role: any;
  key: any
  product: any = [];
  constructor(private cs: CommonService) {
    // this.role = localStorage.getItem('role');
    // this.key = localStorage.getItem('key');
  }

  ngOnInit(): void {
    var postdata = {}
    this.cs.getProduct(postdata).subscribe((res: any) => {
      if (res) {
        this.product = res.filter(element => !element.sold);
      } else {
        this.cs.alert('Error', 'No data found!');
      }
    })
  }

}
