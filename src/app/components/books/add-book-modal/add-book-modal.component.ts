import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../shared/services/books/books.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap, switchMap, catchError } from 'rxjs/operators';
import { BookResult } from '../../../shared/models/book-result';

@Component({
  selector: 'app-add-book-modal',
  templateUrl: './add-book-modal.component.html',
  styleUrls: ['./add-book-modal.component.scss']
})
export class AddBookModalComponent implements OnInit {
  bookToAdd: BookResult;
  loading: boolean;

  constructor(public activeModal: NgbActiveModal, private booksService: BooksService) { }

  ngOnInit() {
  }

  formatter = (x: BookResult) => x.title;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.loading = true),
      switchMap(term =>
        term.length <= 3 ? [] :
        this.booksService.searchBooksByTerm(term).pipe(
          tap(() => {}),
          catchError(() => {            
            return of([]);
          })
      )),
      tap(() => this.loading = false)
    );

  addBook() {
    alert(`I should add ${this.bookToAdd.title}`);
  }

}
