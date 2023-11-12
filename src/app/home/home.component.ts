import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { filter } from 'rxjs';
import { EventMessage, EventType } from '@azure/msal-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit() {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => {
          console.log('event message', msg);
          return msg.eventType === EventType.LOGIN_SUCCESS;
        })
      )
      .subscribe(result => console.log(result));
  }
}
