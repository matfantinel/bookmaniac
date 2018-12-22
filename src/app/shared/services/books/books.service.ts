import { Injectable } from '@angular/core';
import { Book } from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor() {}

  private getBooksDb = () => {
    let db = localStorage.getItem('books');
    let booksDb = db ? (JSON.parse(db) as Array<Book>) : new Array<Book>();

    return booksDb;
  };

  private updateBooksDb = (books: Book[]) => {
    localStorage.setItem('books', JSON.stringify(books));
  };

  public getBooks = () => this.getBooksDb();

  public upsertBook = (book: Book) => {
    const booksDb = this.getBooksDb();

    let existingBookIndex = booksDb.findIndex(
      q => q.openLibraryKey == book.openLibraryKey
    );
    if (existingBookIndex >= 0) {
      booksDb[existingBookIndex] = book;
    } else {
      booksDb.push(book);
    }

    this.updateBooksDb(booksDb);
  };

  public deleteBook = (openLibraryKey: string) => {
    const booksDb = this.getBooksDb();

    let index = booksDb.findIndex(q => q.openLibraryKey == openLibraryKey);
    if (index >= 0) {
      booksDb.splice(index, 1);
    }

    this.updateBooksDb(booksDb);
  };
}
