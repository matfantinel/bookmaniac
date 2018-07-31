import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BooksComponent } from './components/books/books.component';
import { HttpService } from './shared/services/http/http.service';
import { BooksService } from './shared/services/books/books.service';
import { NgbModalStack } from '../../node_modules/@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { ScrollBar } from '../../node_modules/@ng-bootstrap/ng-bootstrap/util/scrollbar';
import { AddBookModalComponent } from './components/books/add-book-modal/add-book-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    BooksComponent,
    AddBookModalComponent
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
    BooksService,
    NgbModalStack,
    ScrollBar    
  ],
  entryComponents: [
    AddBookModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
