import { Component } from '@angular/core';
import { InitialLoadService } from './shared/services/initial-load/initial-load.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(public initialLoadService: InitialLoadService) {}

  ngOnInit() {
    this.initialLoadService.runInitialLoad();
  }
}
