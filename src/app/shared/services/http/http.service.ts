import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: Http) {}

  public get(apiUrl: string, headers: Headers): Observable<Response> {
    return this.http.get(apiUrl, { headers: headers });
  }

  public post(
    apiUrl: string,
    body: any,
    headers: Headers
  ): Observable<Response> {
    return this.http.post(apiUrl, body, { headers: headers });
  }

  public put(
    apiUrl: string,
    body: any,
    headers: Headers
  ): Observable<Response> {
    return this.http.put(apiUrl, body, { headers: headers });
  }

  public delete(apiUrl: string, headers: Headers): Observable<Response> {
    return this.http.delete(apiUrl, { headers: headers });
  }
}
