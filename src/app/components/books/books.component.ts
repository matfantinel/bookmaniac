import { Component, OnInit } from '@angular/core';
import { Book } from '../../shared/models/book';
import { BooksApiService } from '../../shared/services/books-api/books-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBookModalComponent } from './add-book-modal/add-book-modal.component';
import { EditBookModalComponent } from './edit-book-modal/edit-book-modal.component';
import { BooksService } from '../../shared/services/books/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  bookCollection = new Array<Book>();

  constructor(
    private modalService: NgbModal,
    private booksService: BooksService
  ) {}

  ngOnInit() {
    this.loadBooks();
  }

  bookReadChanged(book: Book) {
    if (book.read && !book.readDate) {
      book.readDate = book.read ? new Date() : null;
      this.booksService.upsertBook(book);
    }
  }

  openEditBookModal(book: Book) {
    let modal = this.modalService.open(EditBookModalComponent, {
      centered: true,
      windowClass: 'swing-top'
    });
    modal.componentInstance.book = book;

    modal.result.then(
      reload => {
        if (reload) {
          this.loadBooks();
        }
      },
      reason => {}
    );
  }

  loadBooks() {
    this.bookCollection = this.booksService.getBooks();
  }

  openAddToCollectionModal() {
    this.modalService
      .open(AddBookModalComponent, {
        centered: true,
        windowClass: 'swing-top'
      })
      .result.then(
        reload => {
          if (reload) {
            this.loadBooks();
          }
        },
        reason => {}
      );
  }
}
