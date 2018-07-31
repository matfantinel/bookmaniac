import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Headers } from '@angular/http';
import { BookResult } from "../../models/book-result";

@Injectable({
  providedIn: "root"
})
export class BooksService {
  baseApiUrl: string = "https://openlibrary.org";

  constructor(private httpService: HttpService) {
    this.headers = this.buildHeaders();
  }

  private headers: Headers;

  private buildHeaders(): Headers {
    let headers = new Headers();
    return headers;
  }

  private mountQuery(input: any) {
    if (!input) {
      return '';
    }

    let properties = Object.getOwnPropertyNames(input);
    let query = [];
    for (let i = 0; i < properties.length; i++) {
      if (properties[i]) {
        query.push(`${properties[i]}=${encodeURIComponent(eval('input.' + properties[i]))}`);
      }
    }

    let ret = query.join('&');
    return ret;
  }

  public searchBooksByTerm(term: string): Observable<Array<BookResult>> {
    let query = {
      q: term,
      languages: 'eng'      
    };

    return this.httpService
      .get(`${this.baseApiUrl}/search.json?${this.mountQuery(query)}`, this.headers)
      .pipe(
        map(response => (response.json().docs) as Array<BookResult>)
      );
  }
}
