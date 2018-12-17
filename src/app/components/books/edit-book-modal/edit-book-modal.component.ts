import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-book-modal',
  templateUrl: './edit-book-modal.component.html',
  styleUrls: ['./edit-book-modal.component.scss']
})
export class EditBookModalComponent implements OnInit {
  @Input() book: Book;

  @ViewChild(NgForm)
  form: NgForm;

  @ViewChild('readDate') readDateInput: ElementRef;

  constructor(
    public activeModal: NgbActiveModal,
    private booksService: BooksService
  ) {}

  ngOnInit() {
    if (this.book) {
      if (this.book.readDate) {
        (this.book.readDate as any) = this.handleDateForInput(this.book.readDate);
      }
      if (this.book.startedDate) {
        (this.book.startedDate as any) = this.handleDateForInput(this.book.startedDate);
      }
    }
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    this.booksService.upsertBook(this.book);
    
    this.activeModal.close(true);
  }

  delete() {
    this.booksService.deleteBook(this.book.openLibraryKey);

    this.activeModal.close(true);
  }

  bookReadChanged() {
    if (this.book.read && !this.book.readDate) {
      (this.book.readDate as any) = this.handleDateForInput(new Date());
    }
  }

  handleDateForInput(date: Date) {    
    //Converting it to any was necessary due to the use of HTML's native date input
    return new Date(date).toISOString().split('T')[0];
  }
}
