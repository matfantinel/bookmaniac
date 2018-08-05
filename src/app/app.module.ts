import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BooksComponent } from './components/books/books.component';
import { HttpService } from './shared/services/http/http.service';
import { BooksApiService } from './shared/services/books-api/books-api.service';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { ScrollBar } from '@ng-bootstrap/ng-bootstrap/util/scrollbar';
import { AddBookModalComponent } from './components/books/add-book-modal/add-book-modal.component';
import { EditBookModalComponent } from './components/books/edit-book-modal/edit-book-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    BooksComponent,
    AddBookModalComponent,
    EditBookModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [
    HttpService,
    BooksApiService,
    NgbModalStack,
    ScrollBar    
  ],
  entryComponents: [
    AddBookModalComponent,
    EditBookModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
