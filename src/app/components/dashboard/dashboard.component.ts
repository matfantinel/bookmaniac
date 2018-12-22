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
    this.loadMonthlyChartOptions();
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

  loadMonthlyChartOptions() {
    this.chartOptions = {
      backgroundColor: '#fff',
      legend: {
        data: 'Books Read'
      },
      tooltip: {},
      xAxis: {
        data: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ]
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
          data: this.loadMonthlyChartData()
        }
      ]
    }
  }

  loadMonthlyChartData() {
    let books = this.booksService.getBooks();
    if (books == null) {
      return null;
    }

    let currentYear = new Date().getFullYear();
    let readBooks = books.filter(q => q.read && q.readDate && new Date(q.readDate).getFullYear() == currentYear);

    return [
      readBooks.filter(q => new Date(q.readDate).getMonth() == 0).length,
      readBooks.filter(q => new Date(q.readDate).getMonth() == 1).length,
      readBooks.filter(q => new Date(q.readDate).getMonth() == 2).length,
      readBooks.filter(q => new Date(q.readDate).getMonth() == 3).length,
      readBooks.filter(q => new Date(q.readDate).getMonth() == 4).length,
      readBooks.filter(q => new Date(q.readDate).getMonth() == 5).length,
      readBooks.filter(q => new Date(q.readDate).getMonth() == 6).length,
      readBooks.filter(q => new Date(q.readDate).getMonth() == 7).length,
      readBooks.filter(q => new Date(q.readDate).getMonth() == 8).length,
      readBooks.filter(q => new Date(q.readDate).getMonth() == 9).length,
      readBooks.filter(q => new Date(q.readDate).getMonth() == 10).length,
      readBooks.filter(q => new Date(q.readDate).getMonth() == 11).length
    ];
  }
}
