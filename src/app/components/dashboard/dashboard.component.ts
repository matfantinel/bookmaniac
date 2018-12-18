import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/services/books/books.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  collectionChartOptions: any;

  constructor(public booksService: BooksService) {}

  ngOnInit() {
    this.initCollectionChartOptions();
  }

  public initCollectionChartOptions() {
    this.collectionChartOptions = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: 'Books',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: this.loadCollectionChartDate(),
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function(idx) {
            return Math.random() * 200;
          }
        }
      ]
    };
  }

  loadCollectionChartDate() {
    let books = this.booksService.getBooks();
    if (!books) {
      return null;
    }

    let result = [];

    let unreadBooks = books.filter(q => !q.read && !q.startedDate).length;
    if (unreadBooks > 0) {
      result.push({ value: unreadBooks, name: 'Not Read', itemStyle: { color: '#5E565A' } });
    }

    let startedBooks = books.filter(q => !q.read && q.startedDate).length;
    if (startedBooks > 0) {
      result.push({ value: startedBooks, name: 'Started', itemStyle: { color: '#FF934F' } });
    }

    let readBooks = books.filter(q => q.read).length;
    if (readBooks > 0) {
      result.push({ value: readBooks, name: 'Finished', itemStyle: { color: '#4DA167' } });
    }

    return result;
  }
}
