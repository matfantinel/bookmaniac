import { Component, OnInit } from "@angular/core";
import { Book } from "../../shared/models/book";
import { BooksService } from "../../shared/services/books/books.service";
import { NgbModal } from "../../../../node_modules/@ng-bootstrap/ng-bootstrap";
import { AddBookModalComponent } from "./add-book-modal/add-book-modal.component";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"]
})
export class BooksComponent implements OnInit {
  bookCollection = new Array<Book>();  

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  bookReadChanged(book: Book) {
    book.readDate = book.read ? new Date() : null;
  }

  editBook(book: Book) {
    alert("Not implemented");
  }

  openAddToCollectionModal() {
    this.modalService.open(AddBookModalComponent, { centered: true }).result.then((result) => {
      
    }, (reason) => {
      
    });
  }  
}
