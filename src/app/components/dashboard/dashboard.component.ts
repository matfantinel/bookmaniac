import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/services/books/books.service';
import { Book } from 'src/app/shared/models/book';

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
      this.readingBooksPercentage = Math.round(
        Math.floor((this.readingBooks / this.totalBooks) * 100)
      );
    }

    this.readBooks = books.filter(q => q.read).length;

    if (this.readBooks > 0) {
      this.readBooksPercentage = Math.round(
        Math.floor((this.readBooks / this.totalBooks) * 100)
      );
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
        data: this.getPreviousMonthsLabels()
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
    };
  }

  getPreviousMonthsLabels() {
    let today = new Date();
    let currentMonth = today.getMonth();

    let result = [];

    for (let i = 0; i < 12; i++) {
      let month = currentMonth - i;
      if (month < 0) {
        month = month + 12;
      }

      switch (month) {
        case 0:
          result.unshift('Jan');
          break;
        case 1:
          result.unshift('Feb');
          break;
        case 2:
          result.unshift('Mar');
          break;
        case 3:
          result.unshift('Apr');
          break;
        case 4:
          result.unshift('May');
          break;
        case 5:
          result.unshift('Jun');
          break;
        case 6:
          result.unshift('Jul');
          break;
        case 7:
          result.unshift('Aug');
          break;
        case 8:
          result.unshift('Sep');
          break;
        case 9:
          result.unshift('Oct');
          break;
        case 10:
          result.unshift('Nov');
          break;
        case 11:
          result.unshift('Dec');
          break;
      }
    }
    return result;
  }

  loadMonthlyChartData() {
    let books = this.booksService.getBooks();
    if (books == null) {
      return null;
    }

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    let readBooks = books.filter(
      q =>
        q.read &&
        q.readDate &&
        new Date(q.readDate).getFullYear() == currentYear
    );

    let result = [];

    for (let i = 0; i < 12; i++) {
      let year = currentYear;
      let month = currentMonth - i;
      if (month < 0) {
        month = month + 12;
        year = currentYear--;
      }

      result.unshift(this.getBooksByMonth(readBooks, month, year));
    }
    return result;
  }

  getBooksByMonth(books: Book[], month: number, year: number) {
    return books.filter(
      q =>
        new Date(q.readDate).getFullYear() == year &&
        new Date(q.readDate).getMonth() == month
    ).length;
  }
}
