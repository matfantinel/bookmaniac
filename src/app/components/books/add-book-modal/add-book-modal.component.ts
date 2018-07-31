import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../shared/services/books/books.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-book-modal',
  templateUrl: './add-book-modal.component.html',
  styleUrls: ['./add-book-modal.component.scss']
})
export class AddBookModalComponent implements OnInit {
  searchTerm: string;

  constructor(public activeModal: NgbActiveModal, private booksService: BooksService) { }

  ngOnInit() {
  }

  searchBooks() {
    if (this.searchTerm) {
      this.booksService.searchBooksByTerm(this.searchTerm)
      .subscribe(result => {
        console.log(result);
      })
    }
  }

  addBook() {
    alert("Not implemented");
  }

}
