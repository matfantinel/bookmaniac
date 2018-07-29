import { Component, OnInit } from "@angular/core";
import { Book } from "../../shared/models/book";
import { BooksService } from "../../shared/services/books/books.service";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"]
})
export class BooksComponent implements OnInit {
  bookCollection = new Array<Book>();

  constructor(private booksService: BooksService) {}

  asd() {
    this.booksService
      .searchBooksByTerm("The Lord of the Rings")
      .subscribe(asd => {
        console.log(asd[0].author_name);
      });
  }

  ngOnInit() {}

  bookReadChanged(book: Book) {
    book.readDate = book.read ? new Date() : null;
  }

  editBook(book: Book) {
    alert("Not implemented");
  }

  openAddToCollectionModal() {
    alert("Not implemented");
  }
}
