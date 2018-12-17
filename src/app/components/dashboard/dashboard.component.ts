import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  collectionChartOptions: any;

  constructor() { }

  ngOnInit() {
    this.initCollectionChartOptions();
  }

  public initCollectionChartOptions() {
    this.collectionChartOptions = {
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series : [
        {
              name: 'Books',
              type: 'pie',
              radius : '55%',
              center: ['40%', '50%'],
              data:[
                {value:50, name:'Not Read', itemStyle: { color: '#4DA167' }},
                {value:3, name:'Started', itemStyle: { color: '#5E565A' }},
                {value:67, name:'Finished', itemStyle: { color: '#E15554' }},
              ],
              itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                  return Math.random() * 200;
              }
          }
      ]
    };
  }

}
