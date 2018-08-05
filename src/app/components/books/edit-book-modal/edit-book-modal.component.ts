import { Component, OnInit, Input } from '@angular/core';
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
import { Book } from '../../../shared/models/book';
import { BooksService } from '../../../shared/services/books/books.service';

@Component({
  selector: 'app-edit-book-modal',
  templateUrl: './edit-book-modal.component.html',
  styleUrls: ['./edit-book-modal.component.scss']
})
export class EditBookModalComponent implements OnInit {
  @Input() book: Book;

  constructor(
    public activeModal: NgbActiveModal,
    private booksService: BooksService
  ) {}

  ngOnInit() {}

  save() {
    this.booksService.upsertBook(this.book);
    
    this.activeModal.close(true);
  }

  delete() {
    this.booksService.deleteBook(this.book.openLibraryKey);

    this.activeModal.close(true);
  }
}
