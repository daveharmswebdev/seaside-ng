import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { filter, Subject, takeUntil } from 'rxjs';
import { InteractionStatus } from '@azure/msal-browser';
import { TodosService } from '../services/todos.service';

export class Claim {
  id!: number;
  claim!: string;
  value!: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['claim', 'value'];
  dataSource: Claim[] = [];
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private todoService: TodosService
  ) {}

  ngOnInit(): void {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) =>
            status === InteractionStatus.None ||
            status === InteractionStatus.HandleRedirect
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.checkAndSetActiveAccount();
        this.getClaims(
          this.authService.instance.getActiveAccount()?.idTokenClaims
        );
      });

    this.todoService.getPublic().subscribe(console.log);
    this.todoService.getProtected().subscribe(console.log);
  }

  checkAndSetActiveAccount() {
    let activeAccount = this.authService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  getClaims(claims: any) {
    let list: Claim[] = new Array<Claim>();

    Object.keys(claims).forEach(function (k, v) {
      let c = new Claim();
      c.id = v;
      c.claim = k;
      c.value = claims ? claims[k] : null;
      list.push(c);
    });

    console.log(list);

    this.dataSource = list;
  }

  ngOnDestroy() {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
