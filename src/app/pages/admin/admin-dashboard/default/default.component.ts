import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { CommonService } from 'src/app/providers/common.service';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  showChart: any = 'chart';
  count: any;
  chart: Chart;
  chart1: Chart;
  showadmin: boolean = false;
  userData: any = [];
  aCount: any;
  bCount: any;
  data: any[];
  chartDataObj
  dateArray = []
  constructor(private cs: CommonService) { }

  ngOnInit(): void {

    this.cs.getBidList().subscribe((res: any) => {
      if (res.length != 0) {
        var data = [];
        var count = 0;
        for (let index in res) {
          this.dateArray.push(index);
          count = count + res[index].length;
          var point = [index, res[index].length];
          data.push(point);
        }
        this.chartDataObj = data
        this.setChart();
        this.showChart1();
        this.count = count;
      }
    })

    if ((localStorage.getItem('auctionCount') && localStorage.getItem('bidderCount')) !== null) {
      this.aCount = localStorage.getItem('auctionCount');
      this.bCount = localStorage.getItem('bidderCount')
    }
  }

  showChart1() {
    this.showChart = 'chart';
    this.chart1 = new Chart({
      title: {
        text: 'bar'
      },
      credits: {
        enabled: false
      },
      yAxis: {
        title: {
          text: 'Bids per date'
        },
      },
      xAxis: {
        title: {
          text: 'Number Of Bids'
        },
        categories: this.dateArray,
      },
      series: [{
        name: 'Bid',
        type: 'column',
        data: this.chartDataObj,
        color : '#008080'
      }],
    });
  }
  setChart() {
    this.showChart = 'chart';
    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Linechart'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        title: {
          text: 'Week days'
        },
        categories: this.dateArray,
      },
      yAxis: {
        title: {
          text: 'No Of Bids'
        }
      },
      series: [
        {
          name: 'Bid',
          type: 'line',
          data: this.chartDataObj,
          color : '#008080'
        }
      ]

    })
  }
  ShowAdmin() {
    this.showadmin = true;
    this.showChart = 'form';
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }
  hideForm() {
    this.showChart = 'chart';
    this.showadmin = false;
  }

  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }
}
