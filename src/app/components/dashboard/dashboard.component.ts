import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/services/books/books.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  collectionChartOptions: any;

  totalBooks: number;
  readBooks: number;
  unreadBooks: number;
  readingBooks: number;
  readBooksPercentage: number = 0;
  readingBooksPercentage: number = 0;

  chartOptions: any;

  constructor(public booksService: BooksService) {}

  ngOnInit() {
    this.loadCollectionChartData();
    this.loadChartOptions();
  }

  loadCollectionChartData() {
    let books = this.booksService.getBooks();
    if (!books) {
      return;
    }

    this.totalBooks = books.length;

    this.unreadBooks = books.filter(q => !q.read && !q.startedDate).length;

    this.readingBooks = books.filter(q => !q.read && q.startedDate).length;

    if (this.readingBooks > 0) {
      this.readingBooksPercentage = Math.round(Math.floor((this.readingBooks / this.totalBooks) * 100))
    }

    this.readBooks = books.filter(q => q.read).length;

    if (this.readBooks > 0) {
      this.readBooksPercentage = Math.round(Math.floor((this.readBooks / this.totalBooks) * 100))
    }
  }

  loadChartOptions() {
    this.chartOptions = {
      backgroundColor: '#fff',
      legend: {
        data: 'Books Read'
      },
      xAxis: {
        data: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ]
      },
      yAxis: {
        type: 'value',
        name: 'Books Read'
      },
      series: [
        {
          name: 'Books Read',
          type: 'bar',
          stack: 'one',
          itemStyle: {
            color: '#FF934F'
          },
          data: [ 2, 2, 3, 1, 5, 7, 2, 3, 2, 1, 4, 6 ],
          //formatter
        }
      ]
    }
  }
}
