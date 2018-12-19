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
  readBooksPercentage: number;
  readingBooksPercentage: number;

  constructor(public booksService: BooksService) {}

  ngOnInit() {
    this.loadCollectionChartData();
  }

  loadCollectionChartData() {
    let books = this.booksService.getBooks();
    if (!books) {
      return;
    }

    this.totalBooks = books.length;

    this.unreadBooks = books.filter(q => !q.read && !q.startedDate).length;

    this.readingBooks = books.filter(q => !q.read && q.startedDate).length;

    this.readingBooksPercentage = Math.round(Math.floor((this.readingBooks / this.totalBooks) * 100))

    this.readBooks = books.filter(q => q.read).length;

    this.readBooksPercentage = Math.round(Math.floor((this.readBooks / this.totalBooks) * 100))
  }
}
