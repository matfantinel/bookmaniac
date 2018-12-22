import { Injectable } from '@angular/core';
import { Book } from '../../models/book';
import { BooksService } from '../books/books.service';

@Injectable({
  providedIn: 'root'
})
export class InitialLoadService {
  constructor(public booksService: BooksService) {}

  private shouldRunInitialLoad(): boolean {
    let books = this.booksService.getBooks();
    return !books || books.length <= 0;
  }

  runInitialLoad() {
    if (!this.shouldRunInitialLoad()) {
      return;
    }

    console.log('Running initial load');

    let books: Book[];
    books = [
      {
        author: 'J. R. R. Tolkien',
        openLibraryKey: '/works/OL27448W',
        title: 'The Lord of the Rings',
        publishingYear: '1954',
        readerNotes: 'This book should really be broken into 6 smaller books.',
        read: true,
        readDate: new Date('2018-04-15'),
        startedDate: new Date('2018-01-24')
      },
      {
        author: 'Aldous Huxley',
        openLibraryKey: '/works/OL64468W',
        title: 'Brave New World',
        publishingYear: '1932',
        read: true,
        readDate: new Date('2018-05-12'),
        startedDate: new Date('2017-04-23')
      },
      {
        author: 'George Orwell',
        openLibraryKey: '/works/OL1168210W',
        title: 'Animal Farm',
        publishingYear: '1920',
        read: false
      },
      {
        author: 'George Orwell',
        openLibraryKey: '/works/OL15411722W',
        title: '1984',
        publishingYear: '1949',
        read: false,
        startedDate: new Date('2018-12-20')
      },
      {
        author: 'J. K. Rowling',
        openLibraryKey: '/works/OL82592W',
        title: "Harry Potter and the Philosopher's Stone",
        publishingYear: '1997',
        read: true,
        readDate: new Date('2018-06-03'),
        startedDate: new Date('2018-05-30')
      },
      {
        author: 'J. K. Rowling',
        openLibraryKey: '/works/OL16313124W',
        title: 'Harry Potter and the Chamber of Secrets',
        publishingYear: '1998',
        read: true,
        readDate: new Date('2018-06-10'),
        startedDate: new Date('2018-06-04')
      },
      {
        author: 'Douglas Adams',
        openLibraryKey: '/works/OL2163720W',
        title: 'The Restaurant at the End of the Universe',
        publishingYear: '1980',
        startedDate: new Date('2018-08-15'),
        read: true,
        readDate: new Date('2018-08-31')
      },
      {
        author: 'Douglas Adams',
        openLibraryKey: '/works/OL2163719W',
        title: 'So long, and thanks for all the fish',
        publishingYear: '1984',
        startedDate: new Date('2018-09-12'),
        read: true,
        readDate: new Date('2018-09-18')
      },
      {
        author: 'Douglas Adams',
        openLibraryKey: '/works/OL2163721W',
        title: "The Hitchhiker's Guide to the Galaxy",
        publishingYear: '1979',
        startedDate: new Date('2018-08-03'),
        read: true,
        readDate: new Date('2018-08-10')
      },
      {
        author: 'Douglas Adams',
        openLibraryKey: '/works/OL2163718W',
        title: 'Mostly Harmless',
        publishingYear: '1992',
        startedDate: new Date('2018-09-22'),
        read: true,
        readDate: new Date('2018-09-29')
      },
      {
        author: 'Douglas Adams',
        openLibraryKey: '/works/OL2163716W',
        title: 'Life, the Universe and Everything',
        publishingYear: '1982',
        startedDate: new Date('2018-09-02'),
        read: true,
        readDate: new Date('2018-09-07')
      },
      {
        author: 'Dan Brown',
        openLibraryKey: '/works/OL76837W',
        title: 'The Da Vinci Code',
        publishingYear: '2003',
        startedDate: new Date('2018-10-12'),
        read: true,
        readDate: new Date('2018-10-22')
      },
      {
        author: 'Dan Brown',
        openLibraryKey: '/works/OL16804500W',
        title: 'Inferno',
        publishingYear: '2013',
        startedDate: new Date('2018-10-30'),
        read: true,
        readDate: new Date('2018-11-15')
      },
      {
        author: 'Dan Brown',
        openLibraryKey: '/works/OL76838W',
        title: 'Angels & Demons',
        publishingYear: '2000',
        startedDate: new Date('2018-10-01'),
        read: true,
        readDate: new Date('2018-10-11')
      }
    ];

    for (let book of books) {
      this.booksService.upsertBook(book);
    }
  }
}
