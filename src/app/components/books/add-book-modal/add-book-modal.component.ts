import { Component, OnInit } from '@angular/core';
import { BooksApiService } from '../../../shared/services/books-api/books-api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  catchError
} from 'rxjs/operators';
import { BookResult } from '../../../shared/models/book-result';
import { Book } from '../../../shared/models/book';
import { BooksService } from '../../../shared/services/books/books.service';

@Component({
  selector: 'app-add-book-modal',
  templateUrl: './add-book-modal.component.html',
  styleUrls: ['./add-book-modal.component.scss']
})
export class AddBookModalComponent implements OnInit {
  selectedBook: BookResult;
  loading: boolean;
  booksToAdd: Book[];

  constructor(
    public activeModal: NgbActiveModal,
    private booksApiService: BooksApiService,
    private booksService: BooksService
  ) {}

  ngOnInit() {}

  typeAheadFormatter = (x: BookResult) => x.title;

  typeAheadSearch = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => (this.loading = true)),
      switchMap(term =>
        term.length <= 3
          ? of([])
          : this.booksApiService.searchBooksByTerm(term).pipe(
              tap(() => {}),
              catchError(() => {
                return of([]);
              })
            )
      ),
      tap(() => (this.loading = false))
    );
  };

  getTypeAheadResult(data: BookResult) {
    let result = data.title;
    result += data.author_name ? `, ${data.author_name}` : '';
    result += data.first_publish_year ? `, ${data.first_publish_year}` : '';

    return result;
  }

  addBook() {
    if (
      !this.selectedBook ||
      (this.booksToAdd &&
        this.booksToAdd.some(q => q.openLibraryKey == this.selectedBook.key))
    ) {
      return;
    }

    let book = new Book();
    book.author = this.selectedBook.author_name;
    book.openLibraryKey = this.selectedBook.key;
    book.title = this.selectedBook.title;
    book.publishingYear = this.selectedBook.first_publish_year;

    if (!this.booksToAdd) {
      this.booksToAdd = new Array<Book>();
    }

    this.booksToAdd.push(book);

    this.selectedBook = null;
  }

  save() {
    if (this.booksToAdd && this.booksToAdd.length >= 0) {
      for (let book of this.booksToAdd) {
        this.booksService.upsertBook(book);
      }
    }

    this.activeModal.close(true);
  }
}
