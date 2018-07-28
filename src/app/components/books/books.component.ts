import { Component, OnInit } from "@angular/core";
import { Book } from "../../shared/models/book";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"]
})
export class BooksComponent implements OnInit {
  bookCollection = new Array<Book>();

  constructor() {}

  ngOnInit() {
    this.bookCollection = [
      {
        id: "1",
        title: "Lord of the Rings",
        description: "Some guys decide to burn a ring to kill the great evil.",
        read: false
      },
      {
        id: "2",
        title: "The Fault in our Stars",
        description: "She dies",
        read: false
      },
      {
        id: "3",
        title: "Rise of the Lich King",
        description:
          "This books tells the origin story of Arthas Menethil and how he became the Lich King.",
        read: true,
        readDate: new Date()
      },
      {
        id: "4",
        title: "Big Fern Male Chapel Seagull",
        description: "It starts okay and then goes completely WTF.",
        read: true,
        readDate: new Date()
      },
      {
        id: "5",
        title: "The Bible",
        description:
          "Some guy creates a whole world and threatens to burn people that don't do everything he says.",
        read: false
      }
    ];
  }

  bookReadChanged(book: Book) {
    book.readDate = book.read ? new Date() : null;
  }

  editBook(book: Book) {
    alert('Not implemented');
  }
}
